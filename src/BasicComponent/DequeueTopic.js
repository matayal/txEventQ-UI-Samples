import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Form, Col, Row, Alert } from "react-bootstrap";
import {
  headerAndReq,
  baseUrl,
  useFetchSubscriberData,
} from "../Component/ApiData";
import AlertResponse from "../Component/AlertResponse";

function DequeueTopic() {
  const [subscriberName, setSubscriberName] = useState("");
  const { register, handleSubmit, formState } = useForm();
  const { isSubmitting } = formState;

  const [variant, setVariant] = useState("");
  const [alertHeading, setAlertHeading] = useState("");
  const [requestURL, setRequestURL] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const [subscriberData, subscriberLoading] = useFetchSubscriberData(3800);
  const onSubmit = async (e) => {
    try {
      let response = await fetch(
        baseUrl +
          "consumers/" +
          e.subscriberName +
          "/instances/1/records?max_bytes=10000&timeout=120",
        headerAndReq("GET")
      );
      let result = await response.text();
      if (response.status === 201 || response.status === 200) {
        setSubscriberName("");
        setVariant("success");
        setAlertHeading("Dequeue Success!!!");
      } else {
        setVariant("danger");
        setAlertHeading("Oh snap! You got an error!");
      }
      setRequestURL(response.url);
      setResponseMessage(result);
    } catch (error) {
      setResponseMessage(error);
      setVariant("danger");
      setAlertHeading("Oh snap! You got an error!");
    }
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });
  };

  //Distinct Subscriber
  var distinctSubs;
  if (subscriberData !== undefined && subscriberData !== null) {
    distinctSubs = [
      ...new Set(subscriberData.map((item) => item.consumer_group_id)),
    ];
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Form.Group className="mb-3">
            <Col xs={5}>
              <Form.Label>Select the Subscriber Name:</Form.Label>
            </Col>

            <Col xs={5}>
              <Form.Control
                required
                as="select"
                {...register("subscriberName", { required: true })}
              >
                <option
                  value=""
                  onChange={(e) => setSubscriberName(e.target.value)}
                >
                  Select...
                </option>
                {distinctSubs &&
                  distinctSubs
                    .sort((a, b) => (a > b ? 1 : -1))
                    .map((value, index) => (
                      <option
                        key={index}
                        value={value}
                        onChange={(e) => setSubscriberName(e.target.value)}
                      >
                        {value}
                      </option>
                    ))}
              </Form.Control>
            </Col>
          </Form.Group>
        </Row>
        <Row>
          <Col xs={5}>
            <button disabled={isSubmitting} className="btn btn-primary mr-1">
              {isSubmitting && (
                <span className="spinner-border spinner-border-sm mr-1"></span>
              )}
              Submit
            </button>
          </Col>
        </Row>
        <br />
        <br />

        <AlertResponse
          variant={variant}
          alertHeading={alertHeading}
          requestURL={requestURL}
          responseMessage={responseMessage}
        />
      </form>
    </div>
  );
}

export default DequeueTopic;

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Form, Col, Row, Alert } from "react-bootstrap";
import {
  headerAndReq,
  baseUrl,
  useFetchSubscriberData,
} from "../Component/ApiData";

function DequeueTopic() {
  const [subscriberName, setSubscriberName] = useState("");
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("");
  const [alertHeading, setAlertHeading] = useState("");
  const { register, handleSubmit, formState } = useForm();
  const { isSubmitting } = formState;

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
        setMessage(result);
      } else {
        setVariant("danger");
        setAlertHeading("Oh snap! You got an error!");
        setMessage(result);
      }
    } catch (error) {
      setMessage(error);
      setVariant("danger");
      setAlertHeading("Oh snap! You got an error!");
    }
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });
  };

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
                {subscriberData &&
                  subscriberData !== undefined &&
                  subscriberData !== null &&
                  subscriberData
                    .sort((a, b) => (a.topic_name > b.topic_name ? 1 : -1))
                    .map((item) => (
                      <option
                        key={item.consumer_group_id}
                        value={item.consumer_group_id}
                        onChange={(e) => setSubscriberName(e.target.value)}
                      >
                        {item.consumer_group_id}
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

        <Alert variant={variant}>
          <Alert.Heading>{alertHeading}</Alert.Heading>

          <span>{message ? <span>{message}</span> : null}</span>
        </Alert>
      </form>
    </div>
  );
}

export default DequeueTopic;
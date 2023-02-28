import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Form, Col, Row, Alert } from "react-bootstrap";
import {
  headerAndReq,
  useFetchSubscriberData,
  subscriberListUrl,
} from "../Component/ApiData";

function DropSubscriber() {
  const [topicName, setTopicName] = useState("");
  const [subscriberName, setSubscriberName] = useState("");

  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("");
  const [alertHeading, setAlertHeading] = useState("");

  const { register, handleSubmit, formState } = useForm();
  const { isSubmitting } = formState;

  const [subscriberData, subscriberLoading] = useFetchSubscriberData(2500);

  const onSubmit = async (e) => {
    fetch(
      subscriberListUrl + e.subscriberName + "/?topic_name=" + e.topic,
      headerAndReq("DELETE")
    )
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        if (result === "\n") {
          setVariant("success");
          setAlertHeading("Subscriber " + e.subscriberName + "  dropped.");
          setMessage(result);
        } else {
          setVariant("danger");
          setAlertHeading("Oh snap! You got an error!");
          setMessage(result);
        }
      })
      .catch((error) => {
        setMessage(error);
        setVariant("danger");
        setAlertHeading("Ah snap! You got an error!");
      });
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });
  };
  var distinctTopicValues;
  if (subscriberData !== undefined && subscriberData !== null) {
    distinctTopicValues = [
      ...new Set(subscriberData.map((item) => item.topic)),
    ];
  }
  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Form.Group className="mb-3">
            <Col xs={5}>
              <Form.Label>Select the Topic Name:</Form.Label>
            </Col>

            <Col xs={5}>
              <Form.Control
                required
                as="select"
                {...register("topic", { required: true })}
              >
                <option value="" onChange={(e) => setTopicName(e.target.value)}>
                  Select...
                </option>
                {distinctTopicValues &&
                  distinctTopicValues
                    .sort((a, b) => (a > b ? 1 : -1))
                    .map((value, index) => (
                      <option
                        key={index}
                        value={value}
                        onChange={(e) => setTopicName(e.target.value)}
                      >
                        {value}
                      </option>
                    ))}
              </Form.Control>
            </Col>
          </Form.Group>
        </Row>
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
                    .sort((a, b) =>
                      a.consumer_group_id > b.consumer_group_id ? 1 : -1
                    )
                    .map((item, index) => (
                      <option
                        key={index}
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

export default DropSubscriber;

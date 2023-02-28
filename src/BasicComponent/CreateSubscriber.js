import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Form, Col, Row, Alert } from "react-bootstrap";
import {
  headerAndReq,
  useFetchTopicData,
  subscriberListUrl,
} from "../Component/ApiData";

function CreateSubscriber() {
  const [topicName, setTopicName] = useState("");
  const [subscriberName, setSubscriberName] = useState("");

  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("");
  const [alertHeading, setAlertHeading] = useState("");

  const { register, handleSubmit, formState } = useForm();
  const { isSubmitting } = formState;

  const [topicData, topicLoading] = useFetchTopicData(2800);

  const onSubmit = async (e) => {
    const response = await fetch(
      subscriberListUrl + e.subscriberName + "/?topic_name=" + e.topic,
      headerAndReq("POST")
    );

    if (response.status === 201 || response.status === 200) {
      setTopicName("");
      setSubscriberName("");
      setVariant("success");
      setAlertHeading(
        'Congrats! Subscriber "' + e.subscriberName + '" created.'
      );
    } else {
      Promise.resolve(response.json()).then((value) => {
        setVariant("danger");
        setAlertHeading("Oh snap! You got an error!");
        setMessage(JSON.stringify(value));
      });
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
                {topicData &&
                  topicData !== undefined &&
                  topicData !== null &&
                  topicData
                    .sort((a, b) => (a.topic_name > b.topic_name ? 1 : -1))
                    .map((item) => (
                      <option
                        key={item.topic_name}
                        value={item.topic_name}
                        onChange={(e) => setTopicName(e.target.value)}
                      >
                        {item.topic_name}
                      </option>
                    ))}
              </Form.Control>
            </Col>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group className="mb-3">
            <Col xs={5}>
              <Form.Label>Enter the Subscriber Name:</Form.Label>
            </Col>
            <Col xs={5}>
              <Form.Control
                required
                type="text"
                value={subscriberName}
                placeholder="Subscriber Name"
                {...register("subscriberName", { required: true })}
                onChange={(e) => setSubscriberName(e.target.value)}
              />
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

export default CreateSubscriber;

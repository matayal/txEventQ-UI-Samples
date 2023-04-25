import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Form, Col, Row, Alert } from "react-bootstrap";
import {
  headerAndReq,
  useFetchTopicData,
  subscriberListUrl,
} from "../Component/ApiData";
import AlertResponse from "../Component/AlertResponse";

function CreateSubscriber() {
  const [topicName, setTopicName] = useState("");
  const [subscriberName, setSubscriberName] = useState("");
  const { register, handleSubmit, formState } = useForm();
  const { isSubmitting } = formState;

  const [variant, setVariant] = useState("");
  const [alertHeading, setAlertHeading] = useState("");
  const [requestURL, setRequestURL] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const [topicData, topicLoading] = useFetchTopicData(2800);
  const handleInputChange = (event) => {
    let input = event.target.value;
    const regex = /^[a-zA-Z][a-zA-Z0-9_]*(?:_[a-zA-Z0-9]+)*$/;
    if (regex.test(input) || input === "") {
      setSubscriberName(input.toUpperCase());
    }
  };

  const onSubmit = async (e) => {
    try {
      const response = await fetch(
        subscriberListUrl + e.subscriberName + "/?topic_name=" + e.topic,
        headerAndReq("POST")
      );
      let result = await response.text();
      if (response.status === 201) {
        setTopicName("");
        setSubscriberName("");
        setVariant("success");
        setAlertHeading(
          'Congrats! Subscriber "' +
            e.subscriberName.toUpperCase() +
            '" created.'
        );
        setRequestURL(response.url);
        setResponseMessage("Success! There is no content to display yet");
      } else {
        setVariant("danger");
        setAlertHeading("Oh snap! You got an error!");
        setRequestURL(response.url);
        setResponseMessage(result);
      }
    } catch (error) {
      setResponseMessage(error);
      setVariant("danger");
      setAlertHeading("Oh snap! You got an error!");
    }

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1800);
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
                onChange={handleInputChange}
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

export default CreateSubscriber;

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Form, Col, Row, Alert } from "react-bootstrap";
import {
  headerAndReq,
  topicListUrl,
  useFetchTopicData,
} from "../Component/ApiData";

function DropTopic() {
  const [topicName, setTopicName] = useState("");
  const [message, setMessage] = useState("");

  const [variant, setVariant] = useState("");
  const [alertHeading, setAlertHeading] = useState("");

  const { register, handleSubmit, formState } = useForm();
  const { isSubmitting } = formState;

  const [topicData, topicLoading] = useFetchTopicData(2000);
  if (topicData !== undefined && topicData !== null) {
    topicData.sort((a, b) => (a.topic_name > b.topic_name ? 1 : -1));
  }

  const onSubmit = async (e) => {
    let response = fetch(topicListUrl + e.topic + "/", headerAndReq("DELETE"))
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        if (result === "\n") {
          setVariant("success");
          setAlertHeading("Topic " + e.topic + " dropped.");
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
      }, 3000);
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

export default DropTopic;

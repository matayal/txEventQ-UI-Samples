import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, Col, Row } from "react-bootstrap";
import {
  headerAndReq,
  topicListUrl,
  useFetchTopicData,
} from "../Component/ApiData";
import AlertResponse from "../Component/AlertResponse";

function DropTopic() {
  const [topicName, setTopicName] = useState("");
  const { register, handleSubmit, formState } = useForm();
  const { isSubmitting } = formState;

  const [variant, setVariant] = useState("");
  const [alertHeading, setAlertHeading] = useState("");
  const [requestURL, setRequestURL] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const [topicData, topicLoading] = useFetchTopicData(2000);
  if (topicData !== undefined && topicData !== null) {
    topicData.sort((a, b) => (a.topic_name > b.topic_name ? 1 : -1));
  }

  const onSubmit = async (e) => {
    try {
      const response = await fetch(
        topicListUrl + e.topic + "/",
        headerAndReq("DELETE")
      );
      let result = await response.text();
      console.log("1" + response.status);

      if (response.status === 201 || response.status === 200) {
        console.log("2" + response.status);
        setVariant("success");
        setAlertHeading("Topic " + e.topic.toUpperCase() + " dropped.");
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
      }, 1000);
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

export default DropTopic;

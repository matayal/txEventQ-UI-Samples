import React, { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { Form, Col, Row } from "react-bootstrap";
import {
  headerAndReq,
  useFetchSubscriberData,
  subscriberListUrl,
} from "../Component/ApiData";
import AlertResponse from "../Component/AlertResponse";

function DropSubscriber() {
  const [topicName, setTopicName] = useState("");
  const [subscriberName, setSubscriberName] = useState("");
  const { register, handleSubmit, formState } = useForm();
  const { isSubmitting } = formState;

  const [variant, setVariant] = useState("");
  const [alertHeading, setAlertHeading] = useState("");
  const [requestURL, setRequestURL] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const [subscriberData, subscriberLoading] = useFetchSubscriberData(2500);

  const onSubmit = async (e) => {
    try {
      const response = await fetch(
        subscriberListUrl + e.subscriberName + "/?topic_name=" + e.topic,
        headerAndReq("DELETE")
      );

      let result = await response.text();
      if (response.status === 201 || response.status === 200) {
        setVariant("success");
        setAlertHeading(
          "Subscriber " + e.subscriberName.toUpperCase() + "  dropped."
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
      }, 2000);
    });
  };

  //Topic DropDown
  var distinctTopicValues;
  if (subscriberData !== undefined && subscriberData !== null) {
    distinctTopicValues = [
      ...new Set(subscriberData.map((item) => item.topic)),
    ];
  }
  const handleTopicChange = (e) => {
    const selectedTopic = e.target.value;
    setTopicName(selectedTopic);
  };

  //SubscriberDropDown
  const subscriberDataFiltered = useMemo(() => {
    if (
      subscriberData &&
      subscriberData !== undefined &&
      subscriberData !== null
    ) {
      return subscriberData.filter((item) => item.topic === topicName);
    } else {
      return [];
    }
  }, [topicName, subscriberData]);

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
                onChange={handleTopicChange}
              >
                <option value="">Select...</option>
                {distinctTopicValues &&
                  distinctTopicValues
                    .sort((a, b) => (a > b ? 1 : -1))
                    .map((value, index) => (
                      <option key={index} value={value}>
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
                {subscriberDataFiltered &&
                  subscriberDataFiltered.map((item, index) => (
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

export default DropSubscriber;

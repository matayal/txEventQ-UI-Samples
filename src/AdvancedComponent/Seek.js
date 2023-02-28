import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Form, Col, Row, Alert } from "react-bootstrap";

import {
  headerAndReq,
  useFetchTopicData,
  useFetchSubscriberData,
  baseUrl,
} from "../Component/ApiData";

function Seek() {
  const [topicName, setTopicName] = useState("");
  const [subscriberName, setSubscriberName] = useState("");

  const [partitionsCount, setPartitionsCount] = useState(0);
  //const [instance, setInstance] = useState("");
  const [position, setPosition] = useState("");

  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("");
  const [alertHeading, setAlertHeading] = useState("");

  const { register, handleSubmit, formState } = useForm();
  const { isSubmitting } = formState;

  const [subscriberData, subscriberLoading] = useFetchSubscriberData(4000);
  const [topicData, topicLoading] = useFetchTopicData(4000);

  const onSubmit = async (e) => {
    const msgBody =
      '{"partitions":[{"topic":"' +
      e.topic +
      '","partition":' +
      e.partitionsCount +
      "}]}";

    await fetch(
      baseUrl +
        "consumers/" +
        e.subscriberName +
        "/instances/1" +
        //e.instance +
        "/positions/" +
        e.position,
      headerAndReq("POST", msgBody)
    )
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        if (result === "\n") {
          setVariant("success");
          setAlertHeading(
            "Moved Consumer offset to " +
              e.position +
              " of the Partitions specified."
          );
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
          <Form.Group className="mb-3">
            <Col xs={5}>
              <Form.Label>Select the Position:</Form.Label>
            </Col>

            <Col xs={5}>
              <Form.Control
                required
                as="select"
                {...register("position", { required: true })}
              >
                <option value="" onChange={(e) => setPosition(e.target.value)}>
                  Select...
                </option>
                <option
                  value="beginning"
                  onChange={(e) => setPosition(e.target.value)}
                >
                  Beginning
                </option>
                <option
                  value="end"
                  onChange={(e) => setPosition(e.target.value)}
                >
                  End
                </option>
              </Form.Control>
            </Col>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group className="mb-3">
            <Col xs={5}>
              <Form.Label>Enter the Partition:</Form.Label>
            </Col>
            <Col xs={5}>
              <Form.Control
                required
                type="number"
                value={partitionsCount}
                {...register("partitionsCount", { required: true })}
                placeholder="Partitions Count"
                onChange={(e) => setPartitionsCount(e.target.value)}
              />
            </Col>
          </Form.Group>
        </Row>
        {/* <Row>
          <Form.Group className="mb-3">
            <Col xs={5}>
              <Form.Label>Enter the Instance:</Form.Label>
            </Col>
            <Col xs={5}>
              <Form.Control
                required
                type="text"
                value={instance}
                {...register("instance", { required: true })}
                placeholder="Instance"
                onChange={(e) => setInstance(e.target.value)}
              />
            </Col>
          </Form.Group>
        </Row>  */}

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

export default Seek;

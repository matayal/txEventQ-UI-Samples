import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Form, Col, Row, Alert } from "react-bootstrap";
import { headerAndReq, useFetchTopicData, baseUrl } from "../Component/ApiData";

function EnqueueTopic() {
  const [topicName, setTopicName] = useState("");
  const [partitionsCount, setPartitionsCount] = useState(1);

  const [userMessage, setUserMessage] = useState("");
  const [message, setMessage] = useState("");
  const [note, setNote] = useState("");

  const [variant, setVariant] = useState("");
  const [alertHeading, setAlertHeading] = useState("");

  const { register, handleSubmit, formState } = useForm();
  const { isSubmitting } = formState;

  const [topicData, topicLoading] = useFetchTopicData(3800);

  const onSubmit = async (e) => {
    try {
      const partitionDecr = e.partitionsCount - 1;

      const msgBody = '{"records": [{' + e.userMessage + "}]}";
      let response = await fetch(
        baseUrl + "topics/" + e.topic + "/partitions/" + partitionDecr + "/",
        headerAndReq("POST", msgBody)
      );
      let result = await response.text();

      if (response.status === 201) {
        setTopicName("");
        setUserMessage("");
        setVariant("success");
        setAlertHeading("Congrats! Message sent Successfully.");
        setMessage(result);
        setNote(
          "Partitions in the database starts with index 0. If you created a topic with 5 Partitions_count, the Partition index would be 0 to 4."
        );
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
        <Row>
          <Form.Group className="mb-3">
            <Col xs={5}>
              <Form.Label>Enter your message here:</Form.Label>
            </Col>
            <Col xs={5}>
              <Form.Control
                required
                as="textarea"
                value={userMessage}
                placeholder='"key":222, "value":222222'
                {...register("userMessage", { required: true })}
                onChange={(e) => setUserMessage(e.target.value)}
              />
              <Form.Text muted>Example: "key":222, "value":"Sample"</Form.Text>
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
          <span>{message ? <span>{message}</span> : null} </span>
          <hr />
          <span className="mb-0">{note ? <span>{note}</span> : null}</span>
        </Alert>
      </form>
    </div>
  );
}

export default EnqueueTopic;

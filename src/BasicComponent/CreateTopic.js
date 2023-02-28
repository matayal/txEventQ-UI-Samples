import React, { useState } from "react";
import { Col, Row, Alert } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Button } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import { headerAndReq, topicListUrl } from "../Component/ApiData";

function CreateTopic() {
  const [topicName, setTopicName] = useState("");
  const [partitionsCount, setPartitionsCount] = useState(1);
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("");
  const [alertHeading, setAlertHeading] = useState("");
  const [loading, setLoading] = React.useState(false);

  let handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(!loading);

      let response = await fetch(
        topicListUrl +
          "?topic_name=" +
          topicName +
          "&partitions_count=" +
          partitionsCount,
        headerAndReq("POST")
      );
      let result = await response.text();
      if (response.status === 201) {
        setVariant("success");
        setMessage(result);
        setAlertHeading("Congrats! Topic created.");
      } else {
        setVariant("danger");
        setAlertHeading("Oh snap! You got an error!");
        setMessage(result);
      }
    } catch (error) {
      setMessage(error);
      console.log(error);
      setVariant("danger");
      setAlertHeading("Oh snap! You got an error!");
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <Form
        className="row h-100 justify-content-center align-items-center"
        onSubmit={handleSubmit}
      >
        <Row>
          <Form.Group className="mb-3">
            <Col xs={5}>
              <Form.Label>Enter the Topic Name:</Form.Label>
            </Col>
            <Col xs={5}>
              <Form.Control
                type="text"
                value={topicName}
                placeholder="Topic Name"
                onChange={(e) => setTopicName(e.target.value)}
                required
              />
            </Col>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group className="mb-3">
            <Col xs={5}>
              <Form.Label>Enter the Partitions Count:</Form.Label>
            </Col>
            <Col xs={5}>
              <Form.Control
                type="number"
                value={partitionsCount}
                placeholder="Partitions Count"
                onChange={(e) => setPartitionsCount(e.target.value)}
              />
            </Col>
          </Form.Group>
        </Row>
        <Row>
          <Col xs={5}>
            <Button
              type="submit"
              loading={loading}
              appearance="primary"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Col>
        </Row>
        <br />
        <br />

        <Alert show={message} variant={variant}>
          <Alert.Heading>{alertHeading}</Alert.Heading>
          <hr />
          <span>{message ? <span>{message}</span> : null}</span>
        </Alert>
      </Form>
    </div>
  );
}

export default CreateTopic;

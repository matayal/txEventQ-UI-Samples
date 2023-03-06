import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Button } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import { headerAndReq, topicListUrl } from "../Component/ApiData";
import AlertResponse from "../Component/AlertResponse";

function CreateTopic() {
  const [topicName, setTopicName] = useState("");
  const [partitionsCount, setPartitionsCount] = useState(5);
  const [loading, setLoading] = React.useState(false);

  const [variant, setVariant] = useState("");
  const [alertHeading, setAlertHeading] = useState("");
  const [requestURL, setRequestURL] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

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
        setTopicName("");
        setVariant("success");
        setAlertHeading(
          'Congrats! Topic "' + topicName.toUpperCase() + '" created.'
        );
      } else {
        setVariant("danger");
        setAlertHeading("Oh snap! You got an error!");
      }

      setRequestURL(response.url);
      setResponseMessage(result);
    } catch (error) {
      setVariant("danger");
      setAlertHeading("Oh snap! You got an error!");
      setResponseMessage(error);
      console.log(error);
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
                max={100}
                placeholder="Partitions Count"
                onChange={(e) => setPartitionsCount(e.target.value)}
              />
              <Form.Text muted>Range: [1- 50000]</Form.Text>
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

        <AlertResponse
          variant={variant}
          alertHeading={alertHeading}
          requestURL={requestURL}
          responseMessage={responseMessage}
        />
      </Form>
    </div>
  );
}

export default CreateTopic;

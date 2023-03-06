import React, { useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { Form, Col, Row } from "react-bootstrap";

import {
  headerAndReq,
  baseUrl,
  useFetchSubscriberData,
  topicListUrl,
} from "../Component/ApiData";
import AlertResponse from "../Component/AlertResponse";

function Seek() {
  const [topicName, setTopicName] = useState("");
  const [subscriberName, setSubscriberName] = useState("");

  const [partitionsCount, setPartitionsCount] = useState(0);
  //const [instance, setInstance] = useState("");
  const [position, setPosition] = useState("");
  const { register, handleSubmit, formState } = useForm();
  const { isSubmitting } = formState;

  const [variant, setVariant] = useState("");
  const [alertHeading, setAlertHeading] = useState("");
  const [requestURL, setRequestURL] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const [subscriberData, subscriberLoading] = useFetchSubscriberData(4000);

  const [partitionData, setPartitionData] = useState([]);

  const onSubmit = async (e) => {
    try {
      const msgBody =
        '{"partitions":[{"topic":"' +
        e.topic +
        '","partition":' +
        e.partitionsCount +
        "}]}";

      let response = await fetch(
        baseUrl +
          "consumers/" +
          e.subscriberName +
          "/instances/1" +
          //e.instance +
          "/positions/" +
          e.position,
        headerAndReq("POST", msgBody)
      );
      let result = await response.text();
      if (response.status === 201) {
        setVariant("success");
        setAlertHeading(
          "Moved Consumer offset to " +
            e.position +
            " of the Partitions specified."
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
    if (selectedTopic) {
      fetch(topicListUrl + selectedTopic + /partitions/, headerAndReq("GET"))
        .then((response) => response.json())
        .then((res) => {
          setPartitionData(res.data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
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
              <Form.Label>Select the Partition:</Form.Label>
            </Col>

            <Col xs={5}>
              <Form.Control
                required
                as="select"
                {...register("partitionsCount", { required: true })}
              >
                <option
                  value=""
                  onChange={(e) => setPartitionsCount(e.target.value)}
                >
                  Select...
                </option>
                {partitionData &&
                  partitionData.map((item, index) => (
                    <option
                      key={index}
                      value={item.partition}
                      onChange={(e) => setPartitionsCount(e.target.value)}
                    >
                      {item.partition}
                    </option>
                  ))}
              </Form.Control>
            </Col>
          </Form.Group>
        </Row>
        {/* <Row>
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
        </Row> */}
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

export default Seek;

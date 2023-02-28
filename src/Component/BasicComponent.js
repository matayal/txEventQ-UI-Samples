import React, { useState, useEffect } from "react";
import CreateTopic from "../BasicComponent/CreateTopic";
import CreateSubscriber from "../BasicComponent/CreateSubscriber";
import ViewSubscriber from "../BasicComponent/ViewSubscriber";
import EnqueueTopic from "../BasicComponent/EnqueueTopic";
import DequeueTopic from "../BasicComponent/DequeueTopic";
import DropSubscriber from "../BasicComponent/DropSubscriber";
import DropTopic from "../BasicComponent/DropTopic";
import ViewTopics from "../BasicComponent/ViewTopics";
import { Accordion } from "react-bootstrap";
export default function BasicComponent() {
  const [delay, setDelay] = useState(2000);

  return (
    <div>
      <Accordion flush>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Create Topic</Accordion.Header>
          <Accordion.Body>
            <CreateTopic />
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header>Create Subscriber</Accordion.Header>
          <Accordion.Body>
            <CreateSubscriber />
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="2">
          <Accordion.Header>View Subscribers</Accordion.Header>
          <Accordion.Body>
            <ViewSubscriber />
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="3">
          <Accordion.Header>View Topics</Accordion.Header>
          <Accordion.Body>
            <ViewTopics delay={5000} />
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="4">
          <Accordion.Header>Send a message</Accordion.Header>
          <Accordion.Body>
            <EnqueueTopic />
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="5">
          <Accordion.Header>Consume message</Accordion.Header>
          <Accordion.Body>
            <DequeueTopic />
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="6">
          <Accordion.Header>Drop Subscriber</Accordion.Header>
          <Accordion.Body>
            <DropSubscriber />
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="7">
          <Accordion.Header>Drop Topic</Accordion.Header>
          <Accordion.Body>
            <DropTopic />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}

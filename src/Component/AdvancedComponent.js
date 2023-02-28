import Accordion from "react-bootstrap/Accordion";
import Seek from "../AdvancedComponent/Seek";
import SpecifiedSeek from "../AdvancedComponent/SpecifiedSeek";
import * as React from "react";

export default function AdvancedComponent() {
  return (
    <div>
      <Accordion defaultActiveKey="0" flush>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Seek to Start/ End of Partitions</Accordion.Header>
          <Accordion.Body>
            <Seek />
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header>
            Seek to specified Topic partition offsets
          </Accordion.Header>
          <Accordion.Body>
            <SpecifiedSeek />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}

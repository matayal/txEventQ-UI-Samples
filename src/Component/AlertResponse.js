import React from "react";
import { Alert } from "react-bootstrap";

const AlertResponse = ({
  variant,
  alertHeading,
  requestURL,
  responseMessage,
  note,
}) => {
  if (requestURL) {
    requestURL = requestURL.replace(
      "https://g1f8218cf1799db-demoatp.adb.us-ashburn-1.oraclecloudapps.com/",
      "https://xxxxxdatabase.com/"
    );
  }
  return (
    <Alert show={responseMessage} variant={variant}>
      <Alert.Heading>{alertHeading}</Alert.Heading>
      <hr
        style={{
          border: " 1px solid grey",
        }}
      />
      <br />
      <span>
        {requestURL ? (
          <span>
            <h6>Request:</h6>
            {requestURL}
            <br />
            <br />
          </span>
        ) : null}
      </span>

      <span>
        {responseMessage && !(responseMessage.length === 0) ? (
          <span>
            <h6>Response:</h6>
            {responseMessage}
          </span>
        ) : null}
      </span>

      <span className="mb-0">
        {note ? (
          <span>
            <br />
            <hr
              style={{
                border: " 1px solid grey",
              }}
            />
            {note}
          </span>
        ) : null}
      </span>
    </Alert>
  );
};
export default AlertResponse;

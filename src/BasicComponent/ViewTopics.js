import React, { useState, useEffect, useRef } from "react";
import ViewTopicsTable from "./ViewTopicsTable";
import {
  useFetchSubscriberData,
  useFetchTopicData,
} from "../Component/ApiData";

function ViewTopics() {
  const [subscriberData, subscriberLoading] = useFetchSubscriberData(3300);
  const [topicData, topicLoading] = useFetchTopicData(3000);

  if (topicData !== undefined && topicData !== null) {
    topicData.sort((a, b) => (a.topic_name > b.topic_name ? 1 : -1));
  }
  return (
    <div className="container mt-5">
      <ViewTopicsTable
        topicData={topicData}
        subscriberData={subscriberData}
        loading={topicLoading}
      />
    </div>
  );
}

export default ViewTopics;

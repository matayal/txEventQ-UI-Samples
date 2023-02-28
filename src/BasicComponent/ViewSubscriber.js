import React, { useState, useEffect } from "react";
import ViewSubscriberTable from "./ViewSubscriberTable";
import { useFetchSubscriberData } from "../Component/ApiData";

function ViewSubscriber() {
  const [subscriberData, subscriberLoading] = useFetchSubscriberData(3500);

  if (subscriberData !== undefined && subscriberData !== null) {
    subscriberData.sort((a, b) =>
      a.consumer_group_id > b.consumer_group_id ? 1 : -1
    );
  }

  return (
    <div className="container mt-5">
      <ViewSubscriberTable
        subscriberData={subscriberData}
        loading={subscriberLoading}
      />
    </div>
  );
}

export default ViewSubscriber;

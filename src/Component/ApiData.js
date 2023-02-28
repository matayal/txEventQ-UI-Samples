import { useState, useEffect, useRef } from "react";

const myHeaders = new Headers();
myHeaders.append("Accept", "application/json");
myHeaders.append("Authorization", "XX XXXXXXXXXXXX");

export function headerAndReq(methodType, bodyData) {
  const requestOptions = {
    crossorigin: true,
    mode: "cors",
    method: methodType,
    headers: myHeaders,
    body: bodyData,
    redirect: "follow",
  };
  return requestOptions;
}

export const clusterId = "XXXXXXXXXXX_DEMOATP";

export const baseUrl =
  "https://XXXXXXXXXX-demoatp.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/_/db-api/latest/database/teq/";

export const advancedBaseUrl = baseUrl + "clusters/" + clusterId + "/";

export const topicListUrl = advancedBaseUrl + "topics/";

export const subscriberListUrl = advancedBaseUrl + "consumer-groups/";

export const useFetchSubscriberData = (delay) => {
  const [subscriberData, setSubscriberData] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      fetch(subscriberListUrl, headerAndReq("GET"))
        .then((response) => response.json())
        .then((res) => {
          setSubscriberData(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err.message);
        });
    };
    if (apiRef.current) {
      clearTimeout(apiRef.current);
    }
    apiRef.current = setTimeout(fetchData, delay);
    return () => {
      clearTimeout(apiRef.current);
    };
  }, [subscriberData, delay]);

  return [subscriberData, loading];
};

export const useFetchTopicData = (delay) => {
  const [topicData, setTopicData] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      fetch(topicListUrl, headerAndReq("GET"))
        .then((response) => response.json())
        .then((res) => {
          setTopicData(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err.message);
        });
    };
    if (apiRef.current) {
      clearTimeout(apiRef.current);
    }
    apiRef.current = setTimeout(fetchData, delay);
    return () => {
      clearTimeout(apiRef.current);
    };
  }, [topicData, delay]);

  return [topicData, loading];
};

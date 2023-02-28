import { useState, useEffect, useRef } from "react";
import { headerAndReq, topicListUrl, subscriberListUrl } from "./ApiData";

const useFetchSubscriberData = (delay) => {
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
  }, [subscriberData]);

  return subscriberData;
};

export default useFetchSubscriberData;

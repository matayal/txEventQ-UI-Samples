import { useState, useEffect, useRef } from "react";
import { headerAndReq, topicListUrl, subscriberListUrl } from "./ApiData";

const UseFetchTopicData = (delay) => {
  const [topicData, setTopicData] = useState([]);
  const [loading, setLoading] = useState(true);

  const apiRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      fetch(topicListUrl, headerAndReq("GET"))
        .then((response) => response.json())
        .then((res) => {
          setTopicData(res.data);
          //setLoading(false);
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
  }, [topicData]);

  return topicData;
};

export default UseFetchTopicData;

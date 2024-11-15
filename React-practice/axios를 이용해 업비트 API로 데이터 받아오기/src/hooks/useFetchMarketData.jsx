// hooks/useFetchData.js
import { useState, useEffect } from "react";
import axios from "axios";

const useFetchMarketData = (url) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [url]);

  return data;
};

export default useFetchMarketData;

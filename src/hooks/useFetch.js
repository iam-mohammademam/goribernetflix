import { useState, useEffect } from "react";
import { fetchDataFromApi } from "./api";

const useFetch = (endpoint) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchDataFromApi(endpoint)
      .then((res) => {
        setLoading(false);
        setData(res.data);
        setError(false);
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
      });
  }, [endpoint]);
  return { data, loading, error };
};
export default useFetch;

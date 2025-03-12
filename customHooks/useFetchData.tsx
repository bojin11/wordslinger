import { useEffect, useState } from "react";
import axios from "axios";

const useFetchData = (url: string) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(true);

  console.log(url);

  useEffect(() => {
    const abortCont = new AbortController();
    axios
      .get(url, { signal: abortCont.signal })
      .then(({ data }) => {
        console.log(data);
        setData(data);
        setIsPending(false);
        setError(null);
      })
      .catch((error) => {
        if (error.name === "AbortError") {
          console.log("Get aborted");
        } else {
          setIsPending(false);
          setError(error.message);
        }
      });

    return () => abortCont.abort();
  }, [url]);
  return { data, error, isPending };
};

export default useFetchData;

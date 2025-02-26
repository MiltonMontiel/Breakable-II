import axios from "axios";
import { useEffect, useState } from "react";

export const AxiosInstance = axios.create({
  baseURL: "http://localhost:8080",
});

// export const testConnection = (set: any) => {
//   console.log("Testing connection:");
//   AxiosInstance.get("/")
//     .then((res: any) => {
//       console.log(res.data);
//       set("test");
//     })
//     .catch((error: any) => {
//       console.log(error);
//     });
// };

export const useTestData = () => {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      AxiosInstance.get("/")
        .then((res: any) => {
          console.log(res.data);
          setData(res.data);
        })
        .catch((error: any) => {
          console.error(error);
        });
      setLoading(false);
    };

    fetchData();
  }, []);

  return {
    data,
    loading,
  };
};

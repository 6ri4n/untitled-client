import axios from "axios";
import { useEffect, useState } from "react";

// retrieve access token from auth context
const accessToken = "";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  },
  withCredentials: true,
});

const useApi = (method, url, payload = undefined) => {
  const [state, setState] = useState({
    data: undefined,
    loading: false,
    error: { status: undefined, message: undefined },
  });

  useEffect(() => {
    const request = async () => {
      // available methods: POST, GET, PATCH, DELETE
      const requestMethod = axiosInstance[method.toLowerCase()];

      if (!requestMethod) {
        setState({
          ...prev,
          error: { status: 400, message: "Invalid Method." },
        });
        return;
      }

      setState((prev) => ({
        ...prev,
        loading: true,
      }));

      try {
        const response = await requestMethod(url, payload);
        setState((prev) => ({
          ...prev,
          data: response.data,
          error: { status: undefined, message: undefined },
        }));
      } catch (error) {
        if (
          error.response?.status === 403 &&
          error.response?.data.error.includes("expired")
        ) {
          await retryRequest(requestMethod, url, payload);
        } else {
          setState((prev) => ({
            ...prev,
            error: {
              status: error.response?.status,
              message: error.response?.data.error,
            },
          }));
        }
      } finally {
        setState((prev) => ({
          ...prev,
          loading: false,
        }));
      }
    };

    const retryRequest = async (requestMethod, url, payload = undefined) => {
      try {
        // attempt to refresh access token
        const response = await axiosInstance.post("/account/refresh");
        const newAccessToken = response.accessToken;

        // update headers and auth context
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newAccessToken}`;

        // retry the original request
        const retryResponse = await requestMethod(url, payload);
        setState((prev) => ({
          ...prev,
          data: retryResponse.data,
          error: { status: undefined, message: undefined },
        }));
      } catch (error) {
        setState((prev) => ({
          ...prev,
          error: {
            status: error.response?.status,
            message: error.response?.data.error,
          },
        }));

        // TODO: route user back to login page
      }
    };

    request();
  }, [method, url, payload]);

  return { ...state };
};

export default useApi;

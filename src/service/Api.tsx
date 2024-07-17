import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const errorInterceptor = (error: any) => {
  if (!error.response) {
    return Promise.reject(error);
  }

  switch (error.response.status) {
    case 400:
      toast.error(
        "(System Error) - Bad Request " + error.response.data.message
      );
      break;
    case 401:
      toast.error(
        "(System Error) - Unauthorized: Authentication " +
          error.response.data.message
      );
      break;
    case 403:
      toast.error("(System Error) - Forbidden " + error.response.data.message);
      break;
    case 404:
      toast.error("(System Error) - Not Found " + error.response.data.message);
      break;
    case 500:
      toast.error(
        "(System Error) - Internal Server Error " + error.response.data.message
      );
      break;
    default:
      toast.error("(System Error) - Error" + error.response.data.message);
  }

  return Promise.reject(error);
};

const responseInterceptor = (response: any) => {
  switch (response.status) {
    case 200:
      break;

    default:
  }

  return response;
};

api.interceptors.response.use(responseInterceptor, (error) =>
  errorInterceptor(error)
);

export default api;

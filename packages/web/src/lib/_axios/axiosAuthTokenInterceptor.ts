import { AxiosError, InternalAxiosRequestConfig } from "axios";

const tokenInterceptor = {
  onFulfilled(config: InternalAxiosRequestConfig) {
    const accessToken = document.cookie
      .split("; ")
      .find(row => row.startsWith("accessToken="))
      ?.split("=")[1];

    if (config.headers && !!accessToken) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  onRejected(error: AxiosError) {
    return Promise.reject(error);
  },
};

export default tokenInterceptor;

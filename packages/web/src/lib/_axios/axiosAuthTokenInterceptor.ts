import { AxiosError, InternalAxiosRequestConfig } from "axios";
import { getLocalStorageItem } from "@sparcs-students/web/utils/localStorage";

const tokenInterceptor = {
  onFulfilled(config: InternalAxiosRequestConfig) {
    const accessToken = getLocalStorageItem("accessToken");
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

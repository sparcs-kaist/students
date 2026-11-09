import {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  HttpStatusCode,
} from "axios";

import {
  removeLocalStorageItem,
  setLocalStorageItem,
} from "@sparcs-students/web/utils/localStorage";
import logger from "@sparcs-students/web/utils/logger";

import postRefresh from "./postRefresh";

export type PreserveFormRequestConfig = AxiosRequestConfig & {
  preserveFormOnAuthError?: boolean;
};

const errorInterceptor = {
  onFulfilled(values: AxiosResponse) {
    return values;
  },
  async onRejected(error: AxiosError) {
    const preserveForm = (error.config as PreserveFormRequestConfig | undefined)
      ?.preserveFormOnAuthError;
    switch (error.response?.status) {
      case HttpStatusCode.Unauthorized: {
        try {
          const response = await postRefresh();
          // TODO: 로그인시 기본 프로필 선택
          setLocalStorageItem(
            "responseToken",
            JSON.stringify(response.accessToken),
          );
          if (response.accessToken) {
            setLocalStorageItem("accessToken", response.accessToken ?? "");
            logger.log("Logged in successfully.");
          }
        } catch (refreshError) {
          logger.error("Login failed", refreshError);
          removeLocalStorageItem("accessToken");
          removeLocalStorageItem("responseToken");
          if (!preserveForm) window.location.href = "/";
        }
        return Promise.reject(error);
      }
      case HttpStatusCode.Forbidden: {
        if (preserveForm) return Promise.reject(error);
        const previousPage = document.referrer;

        if (previousPage.startsWith(window.location.origin)) {
          window.history.back();
        } else {
          window.location.href = "/";
        }

        return Promise.reject(error);
      }
      default: {
        return Promise.reject(error);
      }
    }
  },
};

export default errorInterceptor;

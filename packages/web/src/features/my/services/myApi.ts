import { axiosClientWithAuth } from "@sparcs-students/web/lib/axios";
import { HttpStatusCode } from "axios";

import apiUsr002, {
  ApiUsr002ResponseOk,
} from "@sparcs-students/interface/api/user/endpoint/apiUsr002";

// API USR002: 로그인한 사용자 정보 조회
export const getMyInfo = async (): Promise<ApiUsr002ResponseOk> => {
  try {
    const response = await axiosClientWithAuth.get<ApiUsr002ResponseOk>(
      apiUsr002.url(),
    );

    if (response.status === HttpStatusCode.Ok) {
      return response.data;
    }

    throw new Error("Failed to fetch my info");
  } catch (error) {
    console.error("API Error (getMyInfo):", error);
    throw error;
  }
};

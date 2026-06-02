import {
  axiosClient,
  axiosClientWithAuth,
} from "@sparcs-students/web/lib/axios";
import { HttpStatusCode } from "axios";

import apiOrg001, {
  ApiOrg001ResponseOK,
} from "@sparcs-students/interface/api/organization/endpoint/apiOrg001";
import apiOrg011, {
  ApiOrg011RequestBody,
  ApiOrg011ResponseCreated,
} from "@sparcs-students/interface/api/organization/endpoint/apiOrg011";
import apiOrg015, {
  ApiOrg015RequestBody,
  ApiOrg015ResponseOK,
} from "@sparcs-students/interface/api/organization/endpoint/apiOrg015";

// API 015: 타입별 단체목록 조회
export const getOrganizationListByType = async (
  data: ApiOrg015RequestBody,
): Promise<ApiOrg015ResponseOK> => {
  try {
    const response = await axiosClient.post<ApiOrg015ResponseOK>(
      apiOrg015.url(),
      data,
    );
    if (response.status === HttpStatusCode.Ok) return response.data;
    throw new Error("Failed to fetch organizations by type");
  } catch (error) {
    console.error("API Error (getOrganizationListByType):", error);
    throw error;
  }
};

// API 001: 반기별 단체목록 조회
export const getOrganizationLookup = async (): Promise<ApiOrg001ResponseOK> => {
  try {
    const response = await axiosClient.get<ApiOrg001ResponseOK>(
      apiOrg001.url(),
    );

    if (response.status === HttpStatusCode.Ok) {
      return response.data;
    }

    throw new Error("Failed to fetch organization lookup");
  } catch (error) {
    console.error("API Error (getOrganizationLookup):", error);
    throw error;
  }
};

// API 011: 기구 가입 신청
export const applyOrganization = async (
  data: ApiOrg011RequestBody,
): Promise<ApiOrg011ResponseCreated> => {
  try {
    const response = await axiosClientWithAuth.post<ApiOrg011ResponseCreated>(
      apiOrg011.url(),
      data,
    );

    if (response.status === HttpStatusCode.Created) {
      return response.data;
    }

    throw new Error("Failed to apply organization");
  } catch (error) {
    console.error("API Error (applyOrganization):", error);
    throw error;
  }
};

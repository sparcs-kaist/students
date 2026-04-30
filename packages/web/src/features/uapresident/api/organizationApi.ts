import { axiosClientWithAuth } from "@sparcs-students/web/lib/axios";
import { HttpStatusCode } from "axios";

import apiOrg002, {
  ApiOrg002RequestBody,
  ApiOrg002ResponseCreated,
} from "@sparcs-students/interface/api/organization/endpoint/apiOrg002";
import apiOrg003, {
  ApiOrg003RequestBody,
  ApiOrg003ResponseCreated,
} from "@sparcs-students/interface/api/organization/endpoint/apiOrg003";
import apiOrg004, {
  ApiOrg004RequestBody,
  ApiOrg004ResponseOk,
} from "@sparcs-students/interface/api/organization/endpoint/apiOrg004";

// API 002: 단체 생성 (총학생회장 권한)
export const createOrganization = async (
  data: ApiOrg002RequestBody,
): Promise<ApiOrg002ResponseCreated> => {
  try {
    const response = await axiosClientWithAuth.post<ApiOrg002ResponseCreated>(
      apiOrg002.url(),
      data,
    );

    if (response.status === HttpStatusCode.Created) {
      return response.data;
    }

    throw new Error("Failed to create organization");
  } catch (error) {
    console.error("API Error (createOrganization):", error);
    throw error;
  }
};

// API 003: 단체장 임명 (총학생회장 권한)
export const appointOrganizationPresident = async (
  data: ApiOrg003RequestBody,
): Promise<ApiOrg003ResponseCreated> => {
  try {
    const response = await axiosClientWithAuth.post<ApiOrg003ResponseCreated>(
      apiOrg003.url(),
      data,
    );

    if (response.status === HttpStatusCode.Created) {
      return response.data;
    }

    throw new Error("Failed to appoint organization president");
  } catch (error) {
    console.error("API Error (appointOrganizationPresident):", error);
    throw error;
  }
};

// API 004: 기구장 임기 종료 (총학생회장 권한)
export const retireOrganizationPresident = async (
  id: number,
  data: ApiOrg004RequestBody,
): Promise<ApiOrg004ResponseOk> => {
  try {
    const response = await axiosClientWithAuth.patch<ApiOrg004ResponseOk>(
      apiOrg004.url(id),
      data,
    );

    if (response.status === HttpStatusCode.Ok) {
      return response.data;
    }

    throw new Error("Failed to retire organization president");
  } catch (error) {
    console.error("API Error (retireOrganizationPresident):", error);
    throw error;
  }
};

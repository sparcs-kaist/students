// @sparcs-students/web/lib/api/organizationApi.ts

import { axiosClientWithAuth } from "@sparcs-students/web/lib/axios";
import { HttpStatusCode } from "axios";

// API 005~009 타입 임포트
import apiOrg005, {
  ApiOrg005RequestBody,
  ApiOrg005ResponseCreated,
} from "@sparcs-students/interface/api/organization/endpoint/apiOrg005";
import apiOrg006, {
  ApiOrg006RequestBody,
  ApiOrg006ResponseCreated,
} from "@sparcs-students/interface/api/organization/endpoint/apiOrg006";
import apiOrg007, {
  ApiOrg007RequestBody,
  ApiOrg007ResponseCreated,
} from "@sparcs-students/interface/api/organization/endpoint/apiOrg007";
import apiOrg008, {
  ApiOrg008RequestBody,
  ApiOrg008ResponseCreated,
} from "@sparcs-students/interface/api/organization/endpoint/apiOrg008";
import apiOrg009, {
  ApiOrg009RequestBody,
  ApiOrg009ResponseCreated,
} from "@sparcs-students/interface/api/organization/endpoint/apiOrg009";

// API 005: 멤버 추가
export const createOrganizationMember = async (
  data: ApiOrg005RequestBody,
): Promise<ApiOrg005ResponseCreated> => {
  try {
    const response = await axiosClientWithAuth.post<ApiOrg005ResponseCreated>(
      apiOrg005.url(),
      data,
    );

    if (response.status === HttpStatusCode.Created) {
      return response.data;
    }

    throw new Error("Failed to create organization member");
  } catch (error) {
    console.error("API Error (createOrganizationMember):", error);
    throw error;
  }
};

// API 006: 매니저 추가
export const createOrganizationManager = async (
  data: ApiOrg006RequestBody,
): Promise<ApiOrg006ResponseCreated> => {
  try {
    const response = await axiosClientWithAuth.post<ApiOrg006ResponseCreated>(
      apiOrg006.url(),
      data,
    );

    if (response.status === HttpStatusCode.Created) {
      return response.data;
    }

    throw new Error("Failed to create organization manager");
  } catch (error) {
    console.error("API Error (createOrganizationManager):", error);
    throw error;
  }
};

// API 007: 팀 생성
export const createTeam = async (
  data: ApiOrg007RequestBody,
): Promise<ApiOrg007ResponseCreated> => {
  try {
    const response = await axiosClientWithAuth.post<ApiOrg007ResponseCreated>(
      apiOrg007.url(),
      data,
    );

    if (response.status === HttpStatusCode.Created) {
      return response.data;
    }

    throw new Error("Failed to create team");
  } catch (error) {
    console.error("API Error (createTeam):", error);
    throw error;
  }
};

// API 008: 팀 멤버 추가
export const createTeamMember = async (
  data: ApiOrg008RequestBody,
): Promise<ApiOrg008ResponseCreated> => {
  try {
    const response = await axiosClientWithAuth.post<ApiOrg008ResponseCreated>(
      apiOrg008.url(),
      data,
    );

    if (response.status === HttpStatusCode.Created) {
      return response.data;
    }

    throw new Error("Failed to create team member");
  } catch (error) {
    console.error("API Error (createTeamMember):", error);
    throw error;
  }
};

// API 009: 팀 리더 추가
export const createTeamLeader = async (
  data: ApiOrg009RequestBody,
): Promise<ApiOrg009ResponseCreated> => {
  try {
    const response = await axiosClientWithAuth.post<ApiOrg009ResponseCreated>(
      apiOrg009.url(),
      data,
    );

    if (response.status === HttpStatusCode.Created) {
      return response.data;
    }

    throw new Error("Failed to create team leader");
  } catch (error) {
    console.error("API Error (createTeamLeader):", error);
    throw error;
  }
};

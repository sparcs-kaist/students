// @sparcs-students/web/lib/api/organizationApi.ts

import {
  axiosClient,
  axiosClientWithAuth,
} from "@sparcs-students/web/lib/axios";
import { HttpStatusCode } from "axios";

// API 001~004 타입 임포트
import apiOrg001, {
  ApiOrg001ResponseOK,
} from "@sparcs-students/interface/api/organization/endpoint/apiOrg001";
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

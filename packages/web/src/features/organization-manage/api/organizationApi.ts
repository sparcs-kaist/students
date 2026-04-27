import { axiosClientWithAuth } from "@sparcs-students/web/lib/axios";
import { HttpStatusCode } from "axios";

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
import apiOrg010, {
  ApiOrg010ResponseOK,
} from "@sparcs-students/interface/api/organization/endpoint/apiOrg010";
import apiOrg012, {
  ApiOrg012RequestBody,
  ApiOrg012ResponseCreated,
} from "@sparcs-students/interface/api/organization/endpoint/apiOrg012";
import apiOrg013, {
  ApiOrg013RequestBody,
  ApiOrg013ResponseCreated,
} from "@sparcs-students/interface/api/organization/endpoint/apiOrg013";
import apiOrg016, {
  ApiOrg016RequestBody,
  ApiOrg016ResponseOk,
} from "@sparcs-students/interface/api/organization/endpoint/apiOrg016";
import apiOrg017, {
  ApiOrg017RequestBody,
  ApiOrg017ResponseOk,
} from "@sparcs-students/interface/api/organization/endpoint/apiOrg017";
import apiOrg018 from "@sparcs-students/interface/api/organization/endpoint/apiOrg018";
import apiOrg019, {
  ApiOrg019RequestBody,
  ApiOrg019ResponseOk,
} from "@sparcs-students/interface/api/organization/endpoint/apiOrg019";
import apiOrg020, {
  ApiOrg020RequestBody,
  ApiOrg020ResponseOk,
} from "@sparcs-students/interface/api/organization/endpoint/apiOrg020";
import apiOrg021 from "@sparcs-students/interface/api/organization/endpoint/apiOrg021";
import apiOrg022, {
  ApiOrg022RequestBody,
  ApiOrg022ResponseOk,
} from "@sparcs-students/interface/api/organization/endpoint/apiOrg022";

// ORG-005: 단체 멤버 임명
export const createOrganizationMember = async (
  data: ApiOrg005RequestBody,
): Promise<ApiOrg005ResponseCreated> => {
  try {
    const response = await axiosClientWithAuth.post<ApiOrg005ResponseCreated>(
      apiOrg005.url(),
      data,
    );
    if (response.status === HttpStatusCode.Created) return response.data;
    throw new Error("Failed to create organization member");
  } catch (error) {
    console.error("API Error (createOrganizationMember):", error);
    throw error;
  }
};

// ORG-006: 단체 매니저 임명
export const createOrganizationManager = async (
  data: ApiOrg006RequestBody,
): Promise<ApiOrg006ResponseCreated> => {
  try {
    const response = await axiosClientWithAuth.post<ApiOrg006ResponseCreated>(
      apiOrg006.url(),
      data,
    );
    if (response.status === HttpStatusCode.Created) return response.data;
    throw new Error("Failed to create organization manager");
  } catch (error) {
    console.error("API Error (createOrganizationManager):", error);
    throw error;
  }
};

// ORG-007: 팀 생성
export const createTeam = async (
  data: ApiOrg007RequestBody,
): Promise<ApiOrg007ResponseCreated> => {
  try {
    const response = await axiosClientWithAuth.post<ApiOrg007ResponseCreated>(
      apiOrg007.url(),
      data,
    );
    if (response.status === HttpStatusCode.Created) return response.data;
    throw new Error("Failed to create team");
  } catch (error) {
    console.error("API Error (createTeam):", error);
    throw error;
  }
};

// ORG-008: 팀 멤버 추가
export const createTeamMember = async (
  data: ApiOrg008RequestBody,
): Promise<ApiOrg008ResponseCreated> => {
  try {
    const response = await axiosClientWithAuth.post<ApiOrg008ResponseCreated>(
      apiOrg008.url(),
      data,
    );
    if (response.status === HttpStatusCode.Created) return response.data;
    throw new Error("Failed to create team member");
  } catch (error) {
    console.error("API Error (createTeamMember):", error);
    throw error;
  }
};

// ORG-009: 팀 리더 추가
export const createTeamLeader = async (
  data: ApiOrg009RequestBody,
): Promise<ApiOrg009ResponseCreated> => {
  try {
    const response = await axiosClientWithAuth.post<ApiOrg009ResponseCreated>(
      apiOrg009.url(),
      data,
    );
    if (response.status === HttpStatusCode.Created) return response.data;
    throw new Error("Failed to create team leader");
  } catch (error) {
    console.error("API Error (createTeamLeader):", error);
    throw error;
  }
};

// ORG-010: 신청 멤버 목록 조회
export const getApplyingMembers = async (): Promise<ApiOrg010ResponseOK> => {
  try {
    const response = await axiosClientWithAuth.get<ApiOrg010ResponseOK>(
      apiOrg010.url(),
    );
    if (response.status === HttpStatusCode.Ok) return response.data;
    throw new Error("Failed to fetch applying members");
  } catch (error) {
    console.error("API Error (getApplyingMembers):", error);
    throw error;
  }
};

// ORG-012: 운영위원회 생성
export const createOperatingCommittee = async (
  data: ApiOrg012RequestBody,
): Promise<ApiOrg012ResponseCreated> => {
  try {
    const response = await axiosClientWithAuth.post<ApiOrg012ResponseCreated>(
      apiOrg012.url(),
      data,
    );
    if (response.status === HttpStatusCode.Created) return response.data;
    throw new Error("Failed to create operating committee");
  } catch (error) {
    console.error("API Error (createOperatingCommittee):", error);
    throw error;
  }
};

// ORG-013: 운영위원회 멤버 임명
export const createOperatingCommitteeMember = async (
  data: ApiOrg013RequestBody,
): Promise<ApiOrg013ResponseCreated> => {
  try {
    const response = await axiosClientWithAuth.post<ApiOrg013ResponseCreated>(
      apiOrg013.url(),
      data,
    );
    if (response.status === HttpStatusCode.Created) return response.data;
    throw new Error("Failed to create operating committee member");
  } catch (error) {
    console.error("API Error (createOperatingCommitteeMember):", error);
    throw error;
  }
};

// ORG-016: 단체 멤버 임기 종료
export const retireOrganizationMember = async (
  id: number,
  data: ApiOrg016RequestBody,
): Promise<ApiOrg016ResponseOk> => {
  try {
    const response = await axiosClientWithAuth.patch<ApiOrg016ResponseOk>(
      apiOrg016.url(String(id)),
      data,
    );
    if (response.status === HttpStatusCode.Ok) return response.data;
    throw new Error("Failed to retire organization member");
  } catch (error) {
    console.error("API Error (retireOrganizationMember):", error);
    throw error;
  }
};

// ORG-017: 단체 매니저 임기 종료
export const retireOrganizationManager = async (
  id: number,
  data: ApiOrg017RequestBody,
): Promise<ApiOrg017ResponseOk> => {
  try {
    const response = await axiosClientWithAuth.patch<ApiOrg017ResponseOk>(
      apiOrg017.url(String(id)),
      data,
    );
    if (response.status === HttpStatusCode.Ok) return response.data;
    throw new Error("Failed to retire organization manager");
  } catch (error) {
    console.error("API Error (retireOrganizationManager):", error);
    throw error;
  }
};

// ORG-018: 팀 삭제
export const deleteTeam = async (id: number): Promise<void> => {
  try {
    const response = await axiosClientWithAuth.delete(apiOrg018.url(id));
    if (response.status === HttpStatusCode.Ok) return;
    throw new Error("Failed to delete team");
  } catch (error) {
    console.error("API Error (deleteTeam):", error);
    throw error;
  }
};

// ORG-019: 팀 멤버 임기 종료
export const retireTeamMember = async (
  id: number,
  data: ApiOrg019RequestBody,
): Promise<ApiOrg019ResponseOk> => {
  try {
    const response = await axiosClientWithAuth.patch<ApiOrg019ResponseOk>(
      apiOrg019.url(String(id)),
      data,
    );
    if (response.status === HttpStatusCode.Ok) return response.data;
    throw new Error("Failed to retire team member");
  } catch (error) {
    console.error("API Error (retireTeamMember):", error);
    throw error;
  }
};

// ORG-020: 팀 리더 임기 종료
export const retireTeamLeader = async (
  id: number,
  data: ApiOrg020RequestBody,
): Promise<ApiOrg020ResponseOk> => {
  try {
    const response = await axiosClientWithAuth.patch<ApiOrg020ResponseOk>(
      apiOrg020.url(String(id)),
      data,
    );
    if (response.status === HttpStatusCode.Ok) return response.data;
    throw new Error("Failed to retire team leader");
  } catch (error) {
    console.error("API Error (retireTeamLeader):", error);
    throw error;
  }
};

// ORG-021: 운영위원회 삭제
export const deleteOperatingCommittee = async (id: number): Promise<void> => {
  try {
    const response = await axiosClientWithAuth.delete(apiOrg021.url(id));
    if (response.status === HttpStatusCode.Ok) return;
    throw new Error("Failed to delete operating committee");
  } catch (error) {
    console.error("API Error (deleteOperatingCommittee):", error);
    throw error;
  }
};

// ORG-022: 운영위원회 멤버 임기 종료
export const retireOperatingCommitteeMember = async (
  id: number,
  data: ApiOrg022RequestBody,
): Promise<ApiOrg022ResponseOk> => {
  try {
    const response = await axiosClientWithAuth.patch<ApiOrg022ResponseOk>(
      apiOrg022.url(id),
      data,
    );
    if (response.status === HttpStatusCode.Ok) return response.data;
    throw new Error("Failed to retire operating committee member");
  } catch (error) {
    console.error("API Error (retireOperatingCommitteeMember):", error);
    throw error;
  }
};

import { axiosClientWithAuth } from "@sparcs-students/web/lib/axios";
import { HttpStatusCode } from "axios";

import apiOrg026, {
  ApiOrg026RequestBody,
  ApiOrg026ResponseCreated,
} from "@sparcs-students/interface/api/organization/endpoint/apiOrg026";

// ORG-026: UAPresident 권한 위임 (총학생회장 권한)
export const delegateUapresident = async (
  data: ApiOrg026RequestBody,
): Promise<ApiOrg026ResponseCreated> => {
  try {
    const response = await axiosClientWithAuth.post<ApiOrg026ResponseCreated>(
      apiOrg026.url(),
      data,
    );
    if (response.status === HttpStatusCode.Created) return response.data;
    throw new Error("Failed to delegate UAPresident");
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("API Error (delegateUapresident):", error);
    throw error;
  }
};

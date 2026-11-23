import { axiosClientWithAuth } from "@sparcs-students/web/lib/axios";
import { HttpStatusCode } from "axios";

import apiPrp106, {
  ApiPrp106RequestBody,
  ApiPrp106ResponseOk,
} from "@sparcs-students/interface/api/proposal/endpoint/apiPrp106";

// API PRP106: 사업계획서 revision 제출 (PATCH)
export const submitProjectProposalRevision = async (
  data: ApiPrp106RequestBody,
): Promise<ApiPrp106ResponseOk> => {
  try {
    const response = await axiosClientWithAuth.patch<ApiPrp106ResponseOk>(
      apiPrp106.url(),
      data,
    );

    if (response.status === HttpStatusCode.Ok) {
      return response.data;
    }

    throw new Error("Failed to submit project proposal revision");
  } catch (error) {
    console.error("API Error (submitProjectProposalRevision):", error);
    throw error;
  }
};

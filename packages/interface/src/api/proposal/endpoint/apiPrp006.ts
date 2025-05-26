import { HttpStatusCode } from "axios";
import { z } from "zod";

import { zId } from "@sparcs-students/interface/common/type/ids";

/**
 * @version v0.1
 * @description 각 기구장들의 권한으로, project-proposal의 내용을 submit하고 revision_id를 갱신합니다.
 * 만약 기존에 제출한 내용과 다른 점이 없으면, 404에러를 던집니다.
 * 만약 비어있는 내용이 존재할 경우, 422 에러를 던집니다.
 * 기존의 제출되었던 내용들은 다시 제출하지 않습니다..
 */
export const ApiPrp006RequestUrl =
  "/chief/proposals/project-proposals/project-proposal/submit";
export const ApiPrp006Method = "PUT";

export const ApiPrp006RequestParam = z.object({
  projectProposalId: zId,
});

export const ApiPrp006RequestBody = z.object({
  organizationId: zId,
  semesterId: zId,
});

export const ApiPrp006ResponseBody = z.object({
  success: z.boolean(),
  submittedIds: z.array(
    z.object({
      projectProposalId: zId,
      projectProposalRevisionId: zId,
    }),
  ),
});

export const apiPrp006 = {
  url: ApiPrp006RequestUrl,
  method: ApiPrp006Method,
  requestParam: ApiPrp006RequestParam,
  requestBody: ApiPrp006RequestBody,
  responseBodyMap: {
    [HttpStatusCode.Ok]: ApiPrp006ResponseBody,
    [HttpStatusCode.NotFound]: z.object({
      error: z.literal(
        "No changes detected from the previously submitted content.",
      ),
    }),
    [HttpStatusCode.UnprocessableEntity]: z.object({
      error: z.literal("Some required fields are empty."),
    }),
  },
};

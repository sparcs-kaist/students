import { HttpStatusCode } from "axios";
import { z } from "zod";

import { zId } from "@sparcs-students/interface/common/type/ids";
import { zUserName } from "@sparcs-students/interface/common/stringLength";

/**
 * @version v0.1
 * @description 각 매니저들의 권한으로, project-proposal의 내용을 수정합니다.
 * 만약 해당 project-proposal-revision이 submit 되어 있는 상태라면, 새로운 proposal-revision을 만들어서 임시저장 해둡니다
 */
export const ApiPrp005RequestUrl =
  "/manager/proposals/project-proposals/project-proposal/:projectProposalId";
export const ApiPrp005Method = "PUT";

export const ApiPrp005RequestParam = z.object({
  projectProposalId: zId,
});

export const ApiPrp005RequestBody = z.object({
  projectName: z.string().max(255).optional(),
  startTerm: z.coerce.date().optional(),
  endTerm: z.coerce.date().optional(),
  teamName: z.string().max(30).optional(),
  managerName: zUserName.optional(),
  purpose: z.string().optional(),
  target: z.string().optional(),
  detail: z.string().optional(),
  timeLines: z
    .array(
      z.object({
        detail: z.string(),
        startTerm: z.coerce.date(),
        endTerm: z.coerce.date(),
        note: z.string().optional(),
      }),
    )
    .optional(),
});

export const ApiPrp005ResponseBody = z.object({
  success: z.boolean(),
});

export const apiPrp005 = {
  url: ApiPrp005RequestUrl,
  method: ApiPrp005Method,
  requestParam: ApiPrp005RequestParam,
  requestBody: ApiPrp005RequestBody,
  responseBodyMap: {
    [HttpStatusCode.Ok]: ApiPrp005ResponseBody,
  },
};

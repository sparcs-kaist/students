import { HttpStatusCode } from "axios";
import { z } from "zod";

import { zId } from "@sparcs-students/interface/common/type/ids";

/**
 * @version v0.1
 * @description 각 매니저들의 권한으로, project-proposal의 내용을 수정합니다.
 * 만약 해당 project-proposal-revision이 submit 되어 있는 상태라면, 새로운 proposal-revision을 만들어서 임시저장 해둡니다
 */

const url = (projectProposalId: number) =>
  `/manager/proposals/project-proposals/project-proposal/${projectProposalId}`;
const method = "PUT";
export const ApiPrp005RequestUrl =
  "/manager/proposals/project-proposals/project-proposal/projectProposalId";

const requestParam = z.object({
  projectProposalId: zId,
});

const requestQuery = z.object({});

const requestBody = z.object({
  projectName: z.coerce.string().max(255).optional(),
  startTerm: z.date().optional(),
  endTerm: z.date().optional(),
  teamName: z.coerce.string().max(30).optional(),
  managerName: zUserName.optional(),
  purpose: z.coerce.string().optional(),
  target: z.coerce.string().optional(),
  detail: z.coerce.string().optional(),
  timeLines: z
    .array(
      z.object({
        detail: z.coerce.string(),
        startTerm: z.date(),
        endTerm: z.date(),
      }),
    )
    .optional(),
});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    success: z.boolean(),
  }),
};

const responseErrorMap = {};

const apiPrp005 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiPrp005RequestParam = z.infer<typeof apiPrp005.requestParam>;
type ApiPrp005RequestQuery = z.infer<typeof apiPrp005.requestQuery>;
type ApiPrp005RequestBody = z.infer<typeof apiPrp005.requestBody>;
type ApiPrp005ResponseOK = z.infer<(typeof apiPrp005.responseBodyMap)[200]>;

export default apiPrp005;

export type {
  ApiPrp005RequestParam,
  ApiPrp005RequestQuery,
  ApiPrp005RequestBody,
  ApiPrp005ResponseOK,
};

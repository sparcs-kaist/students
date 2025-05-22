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

const url = () => `/chief/proposals/project-proposals/project-proposal/submit`;
const method = "PUT";
export const ApiPrp006RequestUrl =
  "/chief/proposals/project-proposals/project-proposal/submit";

const requestParam = z.object({
  projectProposalId: zId,
});

const requestQuery = z.object({});

const requestBody = z.object({
  organizationId: zId,
  semesterId: zId,
});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    success: z.boolean(),
    submittedIds: z
      .object({
        projectProposalId: zId,
        projectProposalRevisionId: zId,
      })
      .array(),
  }),
  [HttpStatusCode.NotFound]: z.object({
    error: z.literal(
      "No changes detected from the previously submitted content.",
    ),
  }),
  [HttpStatusCode.UnprocessableEntity]: z.object({
    error: z.literal("Some required fields are empty."),
  }),
};

const responseErrorMap = {};

const apiPrp006 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiPrp006RequestParam = z.infer<typeof apiPrp006.requestParam>;
type ApiPrp006RequestQuery = z.infer<typeof apiPrp006.requestQuery>;
type ApiPrp006RequestBody = z.infer<typeof apiPrp006.requestBody>;
type ApiPrp006ResponseOK = z.infer<(typeof apiPrp006.responseBodyMap)[200]>;

export default apiPrp006;

export type {
  ApiPrp006RequestParam,
  ApiPrp006RequestQuery,
  ApiPrp006RequestBody,
  ApiPrp006ResponseOK,
};

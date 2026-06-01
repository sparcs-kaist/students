import { z } from "zod";

import { zCode } from "@sparcs-students/interface/common/type/codes";

/**
 * @version v0.1
 * @description 매니저(organizationManager) 권한으로 사업계획서 revision(projectProposalRevision)를 삭제합니다.
 */

const url = () => `/manager/proposals/proposal-revision/delete`;
const method = "DELETE";
export const ApiPrp107RequestUrl =
  "/manager/proposals/proposal-revision/delete";

const requestParam = z.object({});

const requestQuery = z.object({
  code: zCode,
});

const requestBody = z.object({});

const responseBodyMap = {};

const responseErrorMap = {};

const apiPrp107 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiPrp107RequestParam = z.infer<typeof apiPrp107.requestParam>;
type ApiPrp107RequestQuery = z.infer<typeof apiPrp107.requestQuery>;
type ApiPrp107RequestBody = z.infer<typeof apiPrp107.requestBody>;

export default apiPrp107;

export type {
  ApiPrp107RequestParam,
  ApiPrp107RequestQuery,
  ApiPrp107RequestBody,
};

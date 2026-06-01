import { z } from "zod";

import { zId } from "@sparcs-students/interface/common/type/ids";

/**
 * @version v0.1
 * @description 매니저(organizationManager) 권한으로 새로운 운영계획(OperationProposal)을 삭제합니다.
 */

const url = () => `/manager/proposals/operation-proposals/delete`;
const method = "DELETE";
export const ApiPrp114RequestUrl =
  "/manager/proposals/operation-proposals/delete";

const requestParam = z.object({});

const requestQuery = z.object({
  organization: zId,
  semester: zId,
});

const requestBody = z.object({});

const responseBodyMap = {};

const responseErrorMap = {};

const apiPrp114 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiPrp114RequestParam = z.infer<typeof apiPrp114.requestParam>;
type ApiPrp114RequestQuery = z.infer<typeof apiPrp114.requestQuery>;
type ApiPrp114RequestBody = z.infer<typeof apiPrp114.requestBody>;

export default apiPrp114;

export type {
  ApiPrp114RequestParam,
  ApiPrp114RequestQuery,
  ApiPrp114RequestBody,
};

import { HttpStatusCode } from "axios";
import { z } from "zod";

import { zId } from "@sparcs-students/interface/common/type/ids";

/**
 * @version v0.1
 * @description 사업계획서 revision(projectProposalRevision) 제출본 날짜 목록을 조회합니다.
 */

const url = () => `student/proposals/proposal-revision/getDateList`;
const method = "GET";
export const ApiPrp109RequestUrl =
  "student/proposals/proposal-revision/getDateList";

const requestParam = z.object({});

const requestQuery = z.object({
  projectProposal: zId,
});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.array(z.string().datetime()),
};

const responseErrorMap = {};

const apiPrp109 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiPrp109RequestParam = z.infer<typeof apiPrp109.requestParam>;
type ApiPrp109RequestQuery = z.infer<typeof apiPrp109.requestQuery>;
type ApiPrp109RequestBody = z.infer<typeof apiPrp109.requestBody>;
type ApiPrp109ResponseOk = z.infer<(typeof apiPrp109.responseBodyMap)[200]>;

export default apiPrp109;

export type {
  ApiPrp109RequestParam,
  ApiPrp109RequestQuery,
  ApiPrp109RequestBody,
  ApiPrp109ResponseOk,
};

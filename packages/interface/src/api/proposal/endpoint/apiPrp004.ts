import { HttpStatusCode } from "axios";
import { z } from "zod";

import { zId } from "@sparcs-students/interface/common/type/ids";

/**
 * @version v0.1
 * @description 기구장단 권한으로 새로운 project proposal 을 만들어 냅니다.
 * 첫번째 revision도 같이 생성합니다.
 *
 */

const url = () => `/president/proposals/project-proposals/project-proposal`;
const method = "POST";
export const ApiPrp004RequestUrl =
  "/president/proposals/project-proposals/project-proposal";

const requestParam = z.object({});

const requestQuery = z.object({});

const requestBody = z.object({
  projectName: z.coerce.string().max(255),
  startTerm: z.date(),
  endTerm: z.date(),
  teamName: z.coerce.string().max(30),
  managerName: zUserName,
  purpose: z.coerce.string(),
  target: z.coerce.string(),
  detail: z.coerce.string(),
  timeLines: z.array(
    z.object({
      detail: z.coerce.string(),
      startTerm: z.date(),
      endTerm: z.date(),
    }),
  ),
  // 사업 계획서 검토 내역도 여기서 같이 넣어야 하나?
});

const responseBodyMap = {
  [HttpStatusCode.Created]: z.object({
    projectProposalId: zId,
  }),
};

const responseErrorMap = {};

const apiPrp004 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiPrp004RequestParam = z.infer<typeof apiPrp004.requestParam>;
type ApiPrp004RequestQuery = z.infer<typeof apiPrp004.requestQuery>;
type ApiPrp004RequestBody = z.infer<typeof apiPrp004.requestBody>;
type ApiPrp004ResponseCreated = z.infer<
  (typeof apiPrp004.responseBodyMap)[201]
>;

export default apiPrp004;

export type {
  ApiPrp004RequestParam,
  ApiPrp004RequestQuery,
  ApiPrp004RequestBody,
  ApiPrp004ResponseCreated,
};

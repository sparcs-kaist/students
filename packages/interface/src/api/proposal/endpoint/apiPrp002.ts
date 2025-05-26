import { HttpStatusCode } from "axios";
import { z } from "zod";
import { zUserName } from "@sparcs-students/interface/common/stringLength";
import { zId } from "@sparcs-students/interface/common/type/ids";

/**
 * @version v0.1
 * @description 쿼리 파라미터로 projectProposalId를 받아서 사업계획서 뷰어 내용을 받아옵니다.
 */

const url = () => `/student/proposals/project-proposals`;
const method = "GET";
export const ApiPrp002RequestUrl =
  "/student/proposals/project-proposals/project-proposal/projectProposalId";

const requestParam = z.object({
  projectProposalId: zId,
});

const requestQuery = z.object({});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    projectName: z.coerce.string().max(255),
    // 사업 개요
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
        note: z.coerce.string(),
      }),
    ),
    // 사업 예산안
  }),
};

const responseErrorMap = {};

const apiPrp002 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiPrp002RequestParam = z.infer<typeof apiPrp002.requestParam>;
type ApiPrp002RequestQuery = z.infer<typeof apiPrp002.requestQuery>;
type ApiPrp002RequestBody = z.infer<typeof apiPrp002.requestBody>;
type ApiPrp002ResponseOK = z.infer<(typeof apiPrp002.responseBodyMap)[200]>;

export default apiPrp002;

export type {
  ApiPrp002RequestParam,
  ApiPrp002RequestQuery,
  ApiPrp002RequestBody,
  ApiPrp002ResponseOK,
};

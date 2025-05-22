import { HttpStatusCode } from "axios";
import { z } from "zod";

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
    projectName: z.coerce.string().max(255), // 사업명
    // 사업 개요
    startTerm: z.date(), // 사업 준비 기간? 사업 일시?
    endTerm: z.date(), // 사업 준비 기간? 사업 일시?
    teamName: z.coerce.string().max(30), // 담당부서
    managerName: zUserName, // 담당자
    purpose: z.coerce.string(), // 사업 추진 목적
    target: z.coerce.string(), // 사업 수혜 대상자
    detail: z.coerce.string(), // 세부 사업 내용
    timeLines: z.array(
      // 사업 진행 타임라인
      z.object({
        detail: z.coerce.string(),
        startTerm: z.date(),
        endTerm: z.date(),
        note: z.coerce.string(),
      }),
    ),
    // 사업 예산안도 여기에 같이 들어가야 하나?
    // budgetProposals: z.array(
    //   z.object({
    //     budgetId: zId,
    //     budgetCode: z.coerce.string().max(10),
    //     budgetDomain: zEnumName,
    //     budgetDivision: zEnumName,
    //     budgetClass: zEnumName,
    //     detail: z.coerce.string(),
    //     previousAmount: z.number(),
    //     amount: z.number(),
    //     acceptedStatus: zEnumName,
    //   })
    // ),
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

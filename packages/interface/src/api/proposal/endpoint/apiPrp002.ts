import { HttpStatusCode } from "axios";
import { z } from "zod";

import {
  zEnumName,
  zUserName,
} from "@sparcs-students/interface/common/stringLength";
import { zId } from "@sparcs-students/interface/common/type/ids";

/**
 * @version v0.1
 * @description 쿼리 파라미터로 사업계획서 뷰어 내용을 받아옵니다.
 */

const url = () => `/student/proposals/project-proposals`;
const method = "GET";

const requestParam = z.object({
  projectProposalId: zId,
});

const requestQuery = z.object({});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    projectName: z.coerce.string().max(255),
    startTerm: z.date(),
    endTerm: z.date(),
    teamName: z.coerce.string().max(30),
    managerName: zUserName,
    purpose: z.coerce.string(),
    target: z.coerce.string(),
    detail: z.coerce.string(),
    timeLines: z
      .object({
        detail: z.coerce.string(),
        startTerm: z.date(),
        endTerm: z.date(),
        note: z.coerce.string(),
      })
      .array(),
    budgetProposals: z
      .object({
        budgetId: zId,
        budgetCode: z.coerce.string().max(10),
        budgetDomain: zEnumName,
        budgetDivision: zEnumName,
        budgetClass: zEnumName,
        detail: z.coerce.string(),
        previousAmount: z.number(),
        amount: z.number(),
        acceptedStatus: zEnumName,
      })
      .array(),
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

export const ApiPrp002RequestUrl =
  "/student/proposals/project-proposals/project-proposal/projectProposalId";

export type {
  ApiPrp002RequestParam,
  ApiPrp002RequestQuery,
  ApiPrp002RequestBody,
  ApiPrp002ResponseOK,
};

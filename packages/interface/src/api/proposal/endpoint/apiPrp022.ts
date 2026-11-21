import { HttpStatusCode } from "axios";
import { z } from "zod";

import {
  zProjectProposalDocumentReview,
  zProjectProposalDocumentReviewRequestCreate,
} from "../type/project-proposal-document-review.type";

/**
 * @version v0.1
 * @description 집행부원(staff) 권한으로 ProjectProposalDocumentReview를 생성합니다.
 */

const url = () => `/staff/proposals/project-proposals/document-review/create`;
const method = "POST";
export const ApiPrp022RequestUrl =
  "/staff/proposals/project-proposals/document-review/create";

const requestParam = z.object({});

const requestQuery = z.object({});

const requestBody = z.object({
  projectProposalDocumentReview: zProjectProposalDocumentReviewRequestCreate,
});

const responseBodyMap = {
  [HttpStatusCode.Created]: z.object({
    projectProposalDocumentReview: zProjectProposalDocumentReview,
  }),
};

const responseErrorMap = {
  [HttpStatusCode.Unauthorized]: z.object({
    status: z.literal("Error"),
    message: z.literal("Unauthorized"),
  }),
  [HttpStatusCode.Forbidden]: z.object({
    status: z.literal("Error"),
    message: z.literal("Unauthorized"),
  }),
};

const apiPrp022 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiPrp022RequestParam = z.infer<typeof apiPrp022.requestParam>;
type ApiPrp022RequestQuery = z.infer<typeof apiPrp022.requestQuery>;
type ApiPrp022RequestBody = z.infer<typeof apiPrp022.requestBody>;
type ApiPrp022ResponseCreated = z.infer<
  (typeof apiPrp022.responseBodyMap)[201]
>;

export default apiPrp022;

export type {
  ApiPrp022RequestParam,
  ApiPrp022RequestQuery,
  ApiPrp022RequestBody,
  ApiPrp022ResponseCreated,
};

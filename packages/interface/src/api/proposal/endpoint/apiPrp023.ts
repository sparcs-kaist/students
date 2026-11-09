import { HttpStatusCode } from "axios";
import { z } from "zod";

import { zProjectProposalDocumentReview } from "../type/project-proposal-document-review.type";

/**
 * @version v0.1
 * @description 매니저(manager) 권한으로 ProjectProposalDocumentReview를 조회합니다.
 */

const url = () => `/manager/proposals/project-proposals/document-review/read`;
const method = "GET";
export const ApiPrp023RequestUrl =
  "/manager/proposals/project-proposals/document-review/read";

const requestParam = z.object({
  projectProposalRevisionId: z.coerce.number(),
});

const requestQuery = z.object({});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    projectProposalDocumentReview: z.array(zProjectProposalDocumentReview),
  }),
};

const responseErrorMap = {};

const apiPrp023 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiPrp023RequestParam = z.infer<typeof apiPrp023.requestParam>;
type ApiPrp023RequestQuery = z.infer<typeof apiPrp023.requestQuery>;
type ApiPrp023RequestBody = z.infer<typeof apiPrp023.requestBody>;
type ApiPrp023ResponseCreated = z.infer<
  (typeof apiPrp023.responseBodyMap)[200]
>;

export default apiPrp023;

export type {
  ApiPrp023RequestParam,
  ApiPrp023RequestQuery,
  ApiPrp023RequestBody,
  ApiPrp023ResponseCreated,
};

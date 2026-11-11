import { HttpStatusCode } from "axios";
import { z } from "zod";

/**
 * @version v0.1
 * @description 집행부원(staff) 권한으로 ProjectProposalDocumentReview를 삭제합니다.
 */

const url = () =>
  `/staff/proposals/project-proposals/document-review/delete:projectProposalRevisionId`;
const method = "DELETE";
export const ApiPrp024RequestUrl =
  "/staff/proposals/project-proposals/document-review/delete:projectProposalRevisionId";

const requestParam = z.object({
  projectProposalRevisionId: z.coerce.number(),
});

const requestQuery = z.object({});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({}),
};

const responseErrorMap = {};

const apiPrp024 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiPrp024RequestParam = z.infer<typeof apiPrp024.requestParam>;
type ApiPrp024RequestQuery = z.infer<typeof apiPrp024.requestQuery>;
type ApiPrp024RequestBody = z.infer<typeof apiPrp024.requestBody>;
type ApiPrp024ResponseCreated = z.infer<
  (typeof apiPrp024.responseBodyMap)[200]
>;

export default apiPrp024;

export type {
  ApiPrp024RequestParam,
  ApiPrp024RequestQuery,
  ApiPrp024RequestBody,
  ApiPrp024ResponseCreated,
};

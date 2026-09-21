import { HttpStatusCode } from "axios";
import { z } from "zod";

import { zId } from "@sparcs-students/interface/common/type/ids";
import { zProjectProposalRevision } from "../type/project-proposal.type";

/**
 * @version v0.1
 * @description 해당 날짜에 제출된 사업계획서 revision을 조회합니다.
 */

const url = () => "/student/proposals/proposal-revision/getRevisionsByDate";
const method = "GET";

export const ApiPrp110RequestUrl =
  "/student/proposals/proposal-revision/getRevisionsByDate";

const requestParam = z.object({});

const requestQuery = z.object({
  projectProposal: zId,
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .refine(value => {
      const date = new Date(`${value}T00:00:00.000Z`);

      return (
        !Number.isNaN(date.getTime()) &&
        date.toISOString().slice(0, 10) === value
      );
    }, "Invalid date."),
});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    projectProposalRevisions: z.array(zProjectProposalRevision),
  }),
};

const responseErrorMap = {};

const apiPrp110 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiPrp110RequestParam = z.infer<typeof apiPrp110.requestParam>;
type ApiPrp110RequestQuery = z.infer<typeof apiPrp110.requestQuery>;
type ApiPrp110RequestBody = z.infer<typeof apiPrp110.requestBody>;
type ApiPrp110ResponseOk = z.infer<(typeof apiPrp110.responseBodyMap)[200]>;

export default apiPrp110;

export type {
  ApiPrp110RequestParam,
  ApiPrp110RequestQuery,
  ApiPrp110RequestBody,
  ApiPrp110ResponseOk,
};

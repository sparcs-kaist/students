import { HttpStatusCode } from "axios";
import { z } from "zod";

import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

import { registry, restMethod } from "@sparcs-students/interface/open-api";
import { zOperationProposalRevision } from "../type/operation-proposal.type";

extendZodWithOpenApi(z);

const description = `
  # PRP-021

  @version v0.1
  운영계획서를 생성 및 수정합니다 (UPSERT).

  - 대표자로 로그인되어 있어야 사용 가능합니다.
  - 대표자가 아닌 경우 Auth 에러가 발생합니다.
  `;

const url = () => `/chief/proposal/operation-proposal`;
export const ApiPrp021RequestUrl = url();
const method = "PUT";

const requestParam = z.object({});

const requestQuery = z.object({});

const requestBody = z.object({
  operationProposal: z.object({
    organizationDiagramFile:
      zOperationProposalRevision.shape.organizationDiagramFile,
    operatingCommitteeOperation:
      zOperationProposalRevision.shape.operatingCommitteeOperation,
    teamOperation: zOperationProposalRevision.shape.teamOperation,
  }),
});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    operationProposal: zOperationProposalRevision,
  }),
};

const responseErrorMap = {};

const apiPrp021 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiPrp021RequestParam = z.infer<typeof apiPrp021.requestParam>;
type ApiPrp021RequestQuery = z.infer<typeof apiPrp021.requestQuery>;
type ApiPrp021RequestBody = z.infer<typeof apiPrp021.requestBody>;
type ApiPrp021ResponseOk = z.infer<(typeof apiPrp021.responseBodyMap)[200]>;

export default apiPrp021;

export type {
  ApiPrp021RequestParam,
  ApiPrp021RequestQuery,
  ApiPrp021RequestBody,
  ApiPrp021ResponseOk,
};

registry.registerPath({
  tags: ["Proposal"],
  method: restMethod.method[method],
  path: ApiPrp021RequestUrl,
  description,
  summary: "PRP-021: 운영계획서 생성 및 수정",
  request: {
    params: requestParam,
    query: requestQuery,
    body: {
      content: {
        "application/json": {
          schema: requestBody,
        },
      },
    },
  },
  responses: {
    [restMethod.code[method]]: {
      description: "성공적으로 운영계획서를 생성 및 수정했습니다.",
      content: {
        "application/json": {
          schema: responseBodyMap[restMethod.code[method]],
        },
      },
    },
  },
});

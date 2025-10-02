import { HttpStatusCode } from "axios";
import { z } from "zod";

import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

import { registry, restMethod } from "@sparcs-students/interface/open-api";
import { zOperationProposalRevision } from "../type/operation-proposal.type";

extendZodWithOpenApi(z);

const description = `
  # PRP-121

  @version v0.1
  운영계획서를 생성 및 수정합니다 (UPSERT).

  - 대표자로 로그인되어 있어야 사용 가능합니다.
  - 대표자가 아닌 경우 Auth 에러가 발생합니다.
  `;

const url = () => `/chief/proposal/operation-proposal`;
export const ApiPrp121RequestUrl = url();
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

const apiPrp121 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiPrp121RequestParam = z.infer<typeof apiPrp121.requestParam>;
type ApiPrp121RequestQuery = z.infer<typeof apiPrp121.requestQuery>;
type ApiPrp121RequestBody = z.infer<typeof apiPrp121.requestBody>;
type ApiPrp121ResponseOk = z.infer<(typeof apiPrp121.responseBodyMap)[200]>;

export default apiPrp121;

export type {
  ApiPrp121RequestParam,
  ApiPrp121RequestQuery,
  ApiPrp121RequestBody,
  ApiPrp121ResponseOk,
};

registry.registerPath({
  tags: ["Proposal"],
  method: restMethod.method[method],
  path: ApiPrp121RequestUrl,
  description,
  summary: "PRP-121: 운영계획서 생성 및 수정",
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

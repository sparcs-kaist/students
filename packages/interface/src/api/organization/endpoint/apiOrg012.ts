import { HttpStatusCode } from "axios";
import { z } from "zod";

import {
  zOperatingCommittee,
  zOperatingCommitteeRequestCreate,
} from "../type/organization.type";

/**
 * @version v0.1
 * @description 각 단체장단 권한으로, 새로운 운영위원회를 생성합니다.
 */

const url = () => `/president/organizations/operating-committee`;
const method = "POST";
export const ApiOrg012RequestUrl =
  "/president/organizations/operating-committee";

const requestParam = z.object({});

const requestQuery = z.object({});

const requestBody = z.object({
  operatingCommittee: zOperatingCommitteeRequestCreate,
});

const responseBodyMap = {
  [HttpStatusCode.Created]: z.object({
    operatingCommittee: zOperatingCommittee,
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

const apiOrg012 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiOrg012RequestParam = z.infer<typeof apiOrg012.requestParam>;
type ApiOrg012RequestQuery = z.infer<typeof apiOrg012.requestQuery>;
type ApiOrg012RequestBody = z.infer<typeof apiOrg012.requestBody>;
type ApiOrg012ResponseCreated = z.infer<
  (typeof apiOrg012.responseBodyMap)[201]
>;

export default apiOrg012;

export type {
  ApiOrg012RequestParam,
  ApiOrg012RequestQuery,
  ApiOrg012RequestBody,
  ApiOrg012ResponseCreated,
};

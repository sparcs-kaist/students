import { HttpStatusCode } from "axios";
import { z } from "zod";
import { zId } from "@sparcs-students/interface/common/type/ids";

/**
 * @version v0.1
 * @description 기구장의 권한으로 OrganizationManager를 임명합니다.
 */

const url = () => `/president/organizations/manager`;
const method = "POST";
export const ApiOrg006RequestUrl = "/president/organizations/manager";

const requestParam = z.object({});

const requestQuery = z.object({});

const requestBody = z.object({
  userId: zId,
  organizationId: zId,
  semesterId: zId,
});

const responseBodyMap = {
  [HttpStatusCode.Created]: z.object({
    organizationManagerId: zId,
  }),
};

const responseErrorMap = {};

const apiOrg006 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiOrg006RequestParam = z.infer<typeof apiOrg006.requestParam>;
type ApiOrg006RequestQuery = z.infer<typeof apiOrg006.requestQuery>;
type ApiOrg006RequestBody = z.infer<typeof apiOrg006.requestBody>;
type ApiOrg006ResponseCreated = z.infer<
  (typeof apiOrg006.responseBodyMap)[201]
>;

export default apiOrg006;

export type {
  ApiOrg006RequestParam,
  ApiOrg006RequestQuery,
  ApiOrg006RequestBody,
  ApiOrg006ResponseCreated,
};

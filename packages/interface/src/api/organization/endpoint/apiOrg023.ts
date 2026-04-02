import { HttpStatusCode } from "axios";
import { z } from "zod";

import { zStaff, zStaffRequestCreate } from "../type/organization.student.type";

/**
 * @version v0.1
 * @description 총학생회장(uapresident) 권한으로 집행부원(staff)을 임명합니다.
 */

const url = () => `/uapresident/organizations/staff`;
const method = "POST";
export const ApiOrg023RequestUrl = "/uapresident/organizations/staff";

const requestParam = z.object({});

const requestQuery = z.object({});

const requestBody = z.object({
  staff: zStaffRequestCreate,
});

const responseBodyMap = {
  [HttpStatusCode.Created]: z.object({
    staff: zStaff,
  }),
};

const responseErrorMap = {
  [HttpStatusCode.BadRequest]: z.object({
    status: z.literal("Error"),
    message: z.literal("Already Staff"),
  }),
  [HttpStatusCode.Unauthorized]: z.object({
    status: z.literal("Error"),
    message: z.literal("Unauthorized"),
  }),
  [HttpStatusCode.Forbidden]: z.object({
    status: z.literal("Error"),
    message: z.literal("Unauthorized"),
  }),
};

const apiOrg023 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiOrg023RequestParam = z.infer<typeof apiOrg023.requestParam>;
type ApiOrg023RequestQuery = z.infer<typeof apiOrg023.requestQuery>;
type ApiOrg023RequestBody = z.infer<typeof apiOrg023.requestBody>;
type ApiOrg023ResponseCreated = z.infer<
  (typeof apiOrg023.responseBodyMap)[201]
>;

export default apiOrg023;

export type {
  ApiOrg023RequestParam,
  ApiOrg023RequestQuery,
  ApiOrg023RequestBody,
  ApiOrg023ResponseCreated,
};

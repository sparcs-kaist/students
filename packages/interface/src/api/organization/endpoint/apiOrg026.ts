import { HttpStatusCode } from "axios";
import { z } from "zod";

/**
 * @version v0.1
 * @description 총학생회장(UAPresident) 권한을 다음 총학생회장에게 위임합니다.
 * 현재 UAPresident의 임기를 종료하고, 학번으로 지정한 학생에게 새 UAPresident 임기를 시작합니다.
 */

const url = () => `/uapresident/organizations/delegate-uapresident`;
const method = "POST";
export const ApiOrg026RequestUrl =
  "/uapresident/organizations/delegate-uapresident";

const requestParam = z.object({});

const requestQuery = z.object({});

const requestBody = z.object({
  studentNumber: z.coerce.number().int().positive(),
  startTerm: z.coerce.date(),
});

const responseBodyMap = {
  [HttpStatusCode.Created]: z.object({
    newUapresidentId: z.number(),
  }),
};

const responseErrorMap = {
  [HttpStatusCode.BadRequest]: z.object({
    status: z.literal("Error"),
    message: z.string(),
  }),
  [HttpStatusCode.Unauthorized]: z.object({
    status: z.literal("Error"),
    message: z.literal("Unauthorized"),
  }),
  [HttpStatusCode.Forbidden]: z.object({
    status: z.literal("Error"),
    message: z.literal("Unauthorized"),
  }),
  [HttpStatusCode.NotFound]: z.object({
    status: z.literal("Error"),
    message: z.literal("Student Not Found"),
  }),
  [HttpStatusCode.Conflict]: z.object({
    status: z.literal("Error"),
    message: z.literal("Already UAPresident"),
  }),
};

const apiOrg026 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiOrg026RequestParam = z.infer<typeof apiOrg026.requestParam>;
type ApiOrg026RequestQuery = z.infer<typeof apiOrg026.requestQuery>;
type ApiOrg026RequestBody = z.infer<typeof apiOrg026.requestBody>;
type ApiOrg026ResponseCreated = z.infer<
  (typeof apiOrg026.responseBodyMap)[201]
>;

export default apiOrg026;

export type {
  ApiOrg026RequestParam,
  ApiOrg026RequestQuery,
  ApiOrg026RequestBody,
  ApiOrg026ResponseCreated,
};

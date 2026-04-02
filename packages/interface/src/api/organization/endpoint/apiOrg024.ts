import { HttpStatusCode } from "axios";
import { z } from "zod";
import { zStaff } from "../type/organization.student.type";

/**
 * @version v0.1
 * @description 총학생회장(uapresident)의 권한으로 집행부원(staff)의 임기를 종료합니다.
 */

const url = (id: number) => `/uapresident/organizations/staff/${id}/retire`;
const method = "PATCH";
export const ApiOrg024RequestUrl =
  "/uapresident/organizations/staff/:id/retire";

const requestParam = z.object({
  id: z.coerce.number(),
});

const requestQuery = z.object({});

const requestBody = z.object({
  endTerm: z.coerce.date(),
});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    staff: zStaff,
  }),
};

const responseErrorMap = {
  [HttpStatusCode.BadRequest]: z.object({
    status: z.literal("Error"),
    message: z.string(),
  }),
};

const apiOrg024 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiOrg024RequestParam = z.infer<typeof apiOrg024.requestParam>;
type ApiOrg024RequestQuery = z.infer<typeof apiOrg024.requestQuery>;
type ApiOrg024RequestBody = z.infer<typeof apiOrg024.requestBody>;
type ApiOrg024ResponseOk = z.infer<(typeof apiOrg024.responseBodyMap)[200]>;

export default apiOrg024;

export type {
  ApiOrg024RequestParam,
  ApiOrg024RequestQuery,
  ApiOrg024RequestBody,
  ApiOrg024ResponseOk,
};

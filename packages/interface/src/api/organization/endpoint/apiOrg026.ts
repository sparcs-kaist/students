import { HttpStatusCode } from "axios";
import { z } from "zod";
import { zExtractId } from "@sparcs-students/interface/common/type/ids";
import { zDuration } from "@sparcs-students/interface/common/type/time.type";
import { OrganizationPresidentTypeEnum } from "@sparcs-students/interface/common/enum";
import { zStudent } from "@sparcs-students/interface/api/user/type/user.type";
import { zOrganization } from "../type/organization.type";

const url = (studentId: number) =>
  `/uapresident/organizations/get-history-byId?studentId=${studentId}`;
const method = "GET";
export const ApiOrg026RequestUrl =
  "/uapresident/organizations/get-history-byId";

const requestParam = z.object({});
const requestQuery = z.object({ studentId: z.coerce.number() });
const requestBody = z.object({});

const zRoleEntry = z.object({
  kind: z.enum([
    "president",
    "manager",
    "member",
    "staff",
    "teamLeader",
    "operatingCommittee",
  ]),
  title: z.string().max(255).nullable().optional(),
  organizationPresidentTypeEnum: z
    .nativeEnum(OrganizationPresidentTypeEnum)
    .nullable()
    .optional(),
  student: zExtractId(zStudent),
  duration: zDuration,
});

const zOrganizationHistory = z.object({
  organization: zExtractId(zOrganization),
  roles: z
    .array(zRoleEntry)
    .openapi({ description: "기구별 역할 기록, 시작일 기준 정렬" }),
});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({ histories: z.array(zOrganizationHistory) }),
};

const responseErrorMap = {
  [HttpStatusCode.BadRequest]: z.object({
    status: z.literal("Error"),
    message: z.string(),
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
type ApiOrg026ResponseOk = z.infer<(typeof apiOrg026.responseBodyMap)[200]>;

export default apiOrg026;

export type {
  ApiOrg026RequestParam,
  ApiOrg026RequestQuery,
  ApiOrg026RequestBody,
  ApiOrg026ResponseOk,
};

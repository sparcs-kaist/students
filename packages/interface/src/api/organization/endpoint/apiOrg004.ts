import { HttpStatusCode } from "axios";
import { z } from "zod";

import { zId } from "@sparcs-students/interface/common/type/ids";
import { OrganizationPresidentTypeE } from "@sparcs-students/interface/common/enum";
import { zPhoneNumber } from "@sparcs-students/interface/common/type/phoneNumber.type";

/**
 * @version v0.1
 * @description 총학생회장의 권한으로 기구장의 임기를 종료합니다.
 */

const url = () => `/uapresident/organizations/president/retire`;
const method = "GET";
export const ApiOrg004RequestUrl =
  "/uapresident/organizations/president/retire";

const requestParam = z.object({});

const requestQuery = z.object({});

const requestBody = z.object({
  organizationPresidentId: zId,
  endTerm: z.coerce.date(),
});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    organizationPresidentId: zId,
    organizationId: zId,
    userId: zId,
    startTerm: z.coerce.date(),
    endTerm: z.coerce.date(),
    organizationPresidentTypeE: z.nativeEnum(OrganizationPresidentTypeE),
    phoneNumber: zPhoneNumber,
  }),
};

const responseErrorMap = {};

const apiOrg004 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiOrg004RequestParam = z.infer<typeof apiOrg004.requestParam>;
type ApiOrg004RequestQuery = z.infer<typeof apiOrg004.requestQuery>;
type ApiOrg004RequestBody = z.infer<typeof apiOrg004.requestBody>;
type ApiOrg004ResponseOK = z.infer<(typeof apiOrg004.responseBodyMap)[200]>;

export default apiOrg004;

export type {
  ApiOrg004RequestParam,
  ApiOrg004RequestQuery,
  ApiOrg004RequestBody,
  ApiOrg004ResponseOK,
};

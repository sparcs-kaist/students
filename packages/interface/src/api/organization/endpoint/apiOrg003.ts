import { HttpStatusCode } from "axios";
import { z } from "zod";
import { OrganizationPresidentTypeE } from "@sparcs-students/interface/common/enum";
import { zId } from "@sparcs-students/interface/common/type/ids";
import { zPhoneNumber } from "@sparcs-students/interface/common/type/phoneNumber.type";

/**
 * @version v0.1
 * @description 총학생회장 권한으로 새로운 단체를 생성합니다.
 */

const url = () => `/uapresident/organizations/president`;
const method = "POST";
export const ApiOrg003RequestUrl = "/uapresident/organizations/president";

const requestParam = z.object({});

const requestQuery = z.object({});

const requestBody = z.object({
  userId: zId,
  organizationId: zId,
  startTerm: z.coerce.date(),
  endTerm: z.coerce.date().optional(),
  organizationPresidentTypeE: z.nativeEnum(OrganizationPresidentTypeE),
  phoneNumber: zPhoneNumber,
  ignorePrev: z.boolean(),
});

const responseBodyMap = {
  [HttpStatusCode.Created]: z.object({
    organizationPresidentId: zId,
  }),
};

const responseErrorMap = {};

const apiOrg003 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiOrg003RequestParam = z.infer<typeof apiOrg003.requestParam>;
type ApiOrg003RequestQuery = z.infer<typeof apiOrg003.requestQuery>;
type ApiOrg003RequestBody = z.infer<typeof apiOrg003.requestBody>;
type ApiOrg003ResponseCreated = z.infer<
  (typeof apiOrg003.responseBodyMap)[201]
>;

export default apiOrg003;

export type {
  ApiOrg003RequestParam,
  ApiOrg003RequestQuery,
  ApiOrg003RequestBody,
  ApiOrg003ResponseCreated,
};

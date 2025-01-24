import { HttpStatusCode } from "axios";
import { z } from "zod";

import {
  zName,
  zNameEng,
} from "@sparcs-students/interface/common/stringLength";
import { OrganizationTypeE } from "@sparcs-students/interface/common/enum";
import { zId } from "@sparcs-students/interface/common/type/ids";

/**
 * @version v0.1
 * @description 총학생회장 권한으로 새로운 단체를 생성합니다.
 */

const url = () => `/uapresident/organizations/organization`;
const method = "POST";
export const ApiOrg002RequestUrl = "/uapresident/organizations/organization";

const requestParam = z.object({});

const requestQuery = z.object({});

const requestBody = z.object({
  name: zName,
  nameEng: zNameEng,
  organizationTypeId: z.nativeEnum(OrganizationTypeE),
  foundingYear: z.coerce.number().int(),
  startTerm: z.coerce.date(),
  endTerm: z.coerce.date().optional(),
});

const responseBodyMap = {
  [HttpStatusCode.Created]: z.object({
    organizationId: zId,
  }),
};

const responseErrorMap = {};

const apiOrg002 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiOrg002RequestParam = z.infer<typeof apiOrg002.requestParam>;
type ApiOrg002RequestQuery = z.infer<typeof apiOrg002.requestQuery>;
type ApiOrg002RequestBody = z.infer<typeof apiOrg002.requestBody>;
type ApiOrg002ResponseCreated = z.infer<
  (typeof apiOrg002.responseBodyMap)[201]
>;

export default apiOrg002;

export type {
  ApiOrg002RequestParam,
  ApiOrg002RequestQuery,
  ApiOrg002RequestBody,
  ApiOrg002ResponseCreated,
};

import { HttpStatusCode } from "axios";
import { z } from "zod";

import { zHalfYearSummary } from "@sparcs-students/interface/api/semester/type/semester.type";
import { zOrganization } from "../type/organization.type";

/**
 * @version v0.1
 * @description 조회 가이드에 사용되는 반기별 단체목록을 가져옵니다.
 */

const url = () => `/organizations/lookup`;
const method = "GET";
export const ApiOrg001RequestUrl = "/organizations/lookup";

const requestParam = z.object({});

const requestQuery = z.object({});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    organizationLists: z.array(
      z.object({
        halfYear: zHalfYearSummary,
        organizationTypes: z.array(
          z.object({
            organizationTypeEnum: zOrganization.shape.organizationTypeEnum,
            organizations: z.array(zOrganization),
          }),
        ),
      }),
    ),
  }),
};

const responseErrorMap = {};

const apiOrg001 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiOrg001RequestParam = z.infer<typeof apiOrg001.requestParam>;
type ApiOrg001RequestQuery = z.infer<typeof apiOrg001.requestQuery>;
type ApiOrg001RequestBody = z.infer<typeof apiOrg001.requestBody>;
type ApiOrg001ResponseOK = z.infer<(typeof apiOrg001.responseBodyMap)[200]>;

export default apiOrg001;

export type {
  ApiOrg001RequestParam,
  ApiOrg001RequestQuery,
  ApiOrg001RequestBody,
  ApiOrg001ResponseOK,
};

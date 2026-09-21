import { HttpStatusCode } from "axios";
import { z } from "zod";

import { zId } from "@sparcs-students/interface/common/type/ids";

/**
 * @version v0.1
 * @description 단체장(president) 권한으로, 단체(organization)에 신청한 학생(student) 정보를 불러옵니다.
 */

const url = () => `/president/organizations/get-applying`;
const method = "GET";
export const ApiOrg010RequestUrl = "/president/organizations/get-applying";

const requestParam = z.object({});

const requestQuery = z.object({});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    organizationLists: z.array(
      z.object({
        semester: z.object({
          year: z.number(),
          name: z.string(),
        }),
        organizationTypes: z.array(
          z.object({
            organizationTypeEnum: z.number(),
            organizations: z.array(
              z.object({
                id: zId,
                name: z.string(),
                nameEng: z.string(),
                members: z.array(
                  z.object({
                    id: zId,
                    student: z.object({ id: zId }),
                  }),
                ),
              }),
            ),
          }),
        ),
      }),
    ),
  }),
};

const responseErrorMap = {
  [HttpStatusCode.Conflict]: z.object({
    status: z.literal("Error"),
    message: z.literal("Not president"),
  }),
};

const apiOrg010 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

export type ApiOrg010RequestParam = z.infer<typeof apiOrg010.requestParam>;
export type ApiOrg010RequestQuery = z.infer<typeof apiOrg010.requestQuery>;
export type ApiOrg010RequestBody = z.infer<typeof apiOrg010.requestBody>;
export type ApiOrg010ResponseOK = z.infer<
  (typeof apiOrg010.responseBodyMap)[200]
>;

export default apiOrg010;

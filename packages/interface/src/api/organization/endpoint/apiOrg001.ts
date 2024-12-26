import { HttpStatusCode } from "axios";
import { z } from "zod";

import {
  zOrgName,
  zOrgNameEng,
} from "@sparcs-students/interface/common/stringLength";

/**
 * @version v0.1
 * @description 해당 학기에 존재했던 기구 목록을 가져옵니다.
 */

const url = (semesterId: number) => `/organizations/semester/${semesterId}`;
const method = "GET";
export const ApiOrg001RequestUrl = "/organizations/semester/:semesterId";

const requestParam = z.object({
  semesterId: z.coerce.number().int().min(1),
});

const requestQuery = z.object({});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    organizationTypes: z // 기구 타입
      .object({
        id: z.coerce.number().int().min(1),
        name: z.coerce.string().max(30),
        organizations: z // 동아리
          .object({
            id: z.coerce.number().int().min(1),
            name: zOrgName,
            name_eng: zOrgNameEng,
          })
          .array(),
      })
      .array(),
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

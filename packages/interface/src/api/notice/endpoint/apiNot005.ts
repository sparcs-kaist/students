import { HttpStatusCode } from "axios";
import { z } from "zod";

import { zId } from "@sparcs-students/interface/common/type/ids";

/**
 * @version v0.1
 * @description 집행부원 권한으로 공지사항을 삭제합니다.
 */

const url = () => `/staff/notices`;
const method = "DELETE";
export const ApiNot005RequestUrl = `${url()}/:noticeId`;

const requestParam = z.object({
  noticeId: zId,
});

const requestQuery = z.object({});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({}),
};

const responseErrorMap = {};

const apiNot005 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiNot005RequestParam = z.infer<typeof apiNot005.requestParam>;
type ApiNot005RequestQuery = z.infer<typeof apiNot005.requestQuery>;
type ApiNot005RequestBody = z.infer<typeof apiNot005.requestBody>;
type ApiNot005ResponseOk = z.infer<(typeof apiNot005.responseBodyMap)[200]>;

export default apiNot005;

export type {
  ApiNot005RequestParam,
  ApiNot005RequestQuery,
  ApiNot005RequestBody,
  ApiNot005ResponseOk,
};

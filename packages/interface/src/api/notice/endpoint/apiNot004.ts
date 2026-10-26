import { HttpStatusCode } from "axios";
import { z } from "zod";

import { zId } from "@sparcs-students/interface/common/type/ids";
import { zNotice, zNoticeRequestUpdate } from "../type/notice.type";

/**
 * @version v0.1
 * @description 집행부원 권한으로 공지사항을 수정합니다.
 */

const url = () => `/staff/notices`;
const method = "PUT";
export const ApiNot004RequestUrl = `${url()}/:noticeId`;

const requestParam = z.object({
  noticeId: zId,
});

const requestQuery = z.object({});

const requestBody = z.object({
  notice: zNoticeRequestUpdate,
});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    notice: zNotice,
  }),
};

const responseErrorMap = {};

const apiNot004 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiNot004RequestParam = z.infer<typeof apiNot004.requestParam>;
type ApiNot004RequestQuery = z.infer<typeof apiNot004.requestQuery>;
type ApiNot004RequestBody = z.infer<typeof apiNot004.requestBody>;
type ApiNot004ResponseOk = z.infer<(typeof apiNot004.responseBodyMap)[200]>;

export default apiNot004;

export type {
  ApiNot004RequestParam,
  ApiNot004RequestQuery,
  ApiNot004RequestBody,
  ApiNot004ResponseOk,
};

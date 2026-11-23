import { HttpStatusCode } from "axios";
import { z } from "zod";

import { zId } from "@sparcs-students/interface/common/type/ids";
import { zNotice } from "../type/notice.type";

/**
 * @version v0.1
 * @description 공지사항을 조회합니다.
 */

const url = () => `/notices`;
const method = "GET";
export const ApiNot002RequestUrl = `${url()}/:noticeId`;

const requestParam = z.object({
  noticeId: zId,
});

const requestQuery = z.object({});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    notice: zNotice,
  }),
};

const responseErrorMap = {};

const apiNot002 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiNot002RequestParam = z.infer<typeof apiNot002.requestParam>;
type ApiNot002RequestQuery = z.infer<typeof apiNot002.requestQuery>;
type ApiNot002RequestBody = z.infer<typeof apiNot002.requestBody>;
type ApiNot002ResponseOk = z.infer<(typeof apiNot002.responseBodyMap)[200]>;

export default apiNot002;

export type {
  ApiNot002RequestParam,
  ApiNot002RequestQuery,
  ApiNot002RequestBody,
  ApiNot002ResponseOk,
};

import { HttpStatusCode } from "axios";
import { z } from "zod";

import { zNotice } from "../type/notice.type";

/**
 * @version v0.1
 * @description 공지사항 목록을 조회합니다.
 */

const url = () => `/notices`;
const method = "GET";
export const ApiNot001RequestUrl = url();

const requestParam = z.object({});

const requestQuery = z.object({});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    notices: z.array(zNotice),
  }),
};

const responseErrorMap = {};

const apiNot001 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiNot001RequestParam = z.infer<typeof apiNot001.requestParam>;
type ApiNot001RequestQuery = z.infer<typeof apiNot001.requestQuery>;
type ApiNot001RequestBody = z.infer<typeof apiNot001.requestBody>;
type ApiNot001ResponseOk = z.infer<(typeof apiNot001.responseBodyMap)[200]>;

export default apiNot001;

export type {
  ApiNot001RequestParam,
  ApiNot001RequestQuery,
  ApiNot001RequestBody,
  ApiNot001ResponseOk,
};

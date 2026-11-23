import { HttpStatusCode } from "axios";
import { z } from "zod";

import { zNotice, zNoticeRequestCreate } from "../type/notice.type";

/**
 * @version v0.1
 * @description 집행부원 권한으로 공지사항을 생성합니다.
 */

const url = () => `/staff/notices`;
const method = "POST";
export const ApiNot003RequestUrl = url();

const requestParam = z.object({});

const requestQuery = z.object({});

const requestBody = z.object({
  notice: zNoticeRequestCreate,
});

const responseBodyMap = {
  [HttpStatusCode.Created]: z.object({
    notice: zNotice,
  }),
};

const responseErrorMap = {};

const apiNot003 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiNot003RequestParam = z.infer<typeof apiNot003.requestParam>;
type ApiNot003RequestQuery = z.infer<typeof apiNot003.requestQuery>;
type ApiNot003RequestBody = z.infer<typeof apiNot003.requestBody>;
type ApiNot003ResponseCreated = z.infer<
  (typeof apiNot003.responseBodyMap)[201]
>;

export default apiNot003;

export type {
  ApiNot003RequestParam,
  ApiNot003RequestQuery,
  ApiNot003RequestBody,
  ApiNot003ResponseCreated,
};

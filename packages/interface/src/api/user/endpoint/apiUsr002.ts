import { HttpStatusCode } from "axios";
import { z } from "zod";

import { zStudent } from "../type/user.type";

/**
 * @version v0.1
 * @description 학번을 입력받아 유저 정보를 불러옵니다.
 */

const url = () => `/users/find`;
const method = "GET";
export const ApiUsr002RequestUrl = "/users/find";

const requestParam = z.object({});

const requestQuery = z.object({
  studentNumber: z.coerce.number().int(),
});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    user: zStudent,
  }),
};

const responseErrorMap = {};

const apiUsr002 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiUsr002RequestParam = z.infer<typeof apiUsr002.requestParam>;
type ApiUsr002RequestQuery = z.infer<typeof apiUsr002.requestQuery>;
type ApiUsr002RequestBody = z.infer<typeof apiUsr002.requestBody>;
type ApiUsr002ResponseOk = z.infer<(typeof apiUsr002.responseBodyMap)[200]>;

export default apiUsr002;

export type {
  ApiUsr002RequestParam,
  ApiUsr002RequestQuery,
  ApiUsr002RequestBody,
  ApiUsr002ResponseOk,
};

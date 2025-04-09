import { HttpStatusCode } from "axios";
import { z } from "zod";

import { zUserName } from "@sparcs-students/interface/common/stringLength";
import { zId } from "@sparcs-students/interface/common/type/ids";

/**
 * @version v0.1
 * @description 새로운 학부생이 로그인을 했을 때 userDB에 추가합니다.
 * TODO: 로그인 구현에 맞게 Upsert (PUT)로 변경해야 함
 */

const url = () => `/users/sign-up/student`;
const method = "POST";
export const ApiUsr001RequestUrl = "/users/sign-up/student";

const requestParam = z.object({});

const requestQuery = z.object({});

const requestBody = z.object({
  name: zUserName,
  email: z.coerce.string().email(),
  studentNumber: z.coerce.string().max(20),
});

const responseBodyMap = {
  [HttpStatusCode.Created]: z.object({
    userId: zId,
    userStudentId: zId,
  }),
};

const responseErrorMap = {};

const apiUsr001 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiUsr001RequestParam = z.infer<typeof apiUsr001.requestParam>;
type ApiUsr001RequestQuery = z.infer<typeof apiUsr001.requestQuery>;
type ApiUsr001RequestBody = z.infer<typeof apiUsr001.requestBody>;
type ApiUsr001ResponseCreated = z.infer<
  (typeof apiUsr001.responseBodyMap)[201]
>;

export default apiUsr001;

export type {
  ApiUsr001RequestParam,
  ApiUsr001RequestQuery,
  ApiUsr001RequestBody,
  ApiUsr001ResponseCreated,
};

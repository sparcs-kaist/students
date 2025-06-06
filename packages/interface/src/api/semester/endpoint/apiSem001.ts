import { HttpStatusCode } from "axios";
import { z } from "zod";

import { zSemester } from "@sparcs-students/interface/api/semester/type/semester.type";

import { registry, restMethod } from "@sparcs-students/interface/open-api";

const url = () => `/semesters`;

const method = "GET";
export const ApiSem001RequestUrl = "/semesters";

const requestParam = z.object({});

const requestQuery = z.object({});

const requestBody = z.object({
  name: zSemester.shape.name,
  year: zSemester.shape.year,
  semesterEnum: zSemester.shape.semesterEnum,
  startTerm: zSemester.shape.startTerm,
  endTerm: zSemester.shape.endTerm,
  semester: zSemester,
});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({}),
};

const responseErrorMap = {};

const apiSem001 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiSem001RequestParam = z.infer<typeof apiSem001.requestParam>;
type ApiSem001RequestQuery = z.infer<typeof apiSem001.requestQuery>;
type ApiSem001RequestBody = z.infer<typeof apiSem001.requestBody>;
type ApiSem001ResponseOk = z.infer<(typeof apiSem001.responseBodyMap)[200]>;

export default apiSem001;

export type {
  ApiSem001RequestParam,
  ApiSem001RequestQuery,
  ApiSem001RequestBody,
  ApiSem001ResponseOk,
};

registry.registerPath({
  tags: ["Semester"],
  method: restMethod.method[method],
  path: ApiSem001RequestUrl,
  description: `
  # SEM-001

  학기 목록을 가져옵니다.

  Swagger 예시용 API 입니다.
  `,
  summary: "SEM-001: 학기 목록을 가져옵니다.",
  request: {
    body: {
      content: {
        "application/json": {
          schema: requestBody,
        },
      },
    },
  },
  responses: {
    [restMethod.code[method]]: {
      description: "성공적으로 학기 목록을 가져왔습니다.",
      content: {
        "application/json": {
          schema: responseBodyMap[HttpStatusCode.Ok],
        },
      },
    },
  },
});

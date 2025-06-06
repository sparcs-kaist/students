import { registry } from "@sparcs-students/interface/open-api";

import z from "zod";
import { zSemester } from "./type/semester.type";

export * from "./type/semester.type";
export * from "./endpoint/apiSem001";
export { default as apiSem001 } from "./endpoint/apiSem001";

// 도메인 모델 스키마 목록
const zDomainModels = z.object({
  semester: zSemester,
});

registry.registerPath({
  tags: ["Semester"],
  method: "head",
  path: "/#/Semester",
  summary: "SEM-???: Semester 도메인",
  description: `
    TODO: 학기에 관한 도메인 설명 추가하기
    `,
  responses: {
    200: {
      description: "Domain Models for Semester Domain",
      content: {
        "application/json": {
          schema: zDomainModels,
        },
      },
    },
  },
});

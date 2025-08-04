import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { registry } from "@sparcs-students/interface/open-api";
import { z } from "zod";

export * from "./endpoint/apiAut001";
export { default as apiAut001 } from "./endpoint/apiAut001";
export * from "./endpoint/apiAut002";
export { default as apiAut002 } from "./endpoint/apiAut002";
export * from "./endpoint/apiAut003";
export { default as apiAut003 } from "./endpoint/apiAut003";
export * from "./endpoint/apiAut004";
export { default as apiAut004 } from "./endpoint/apiAut004";

extendZodWithOpenApi(z);

// 도메인 모델 스키마 목록
const zDomainModels = z.object({});

registry.registerPath({
  tags: ["Auth"],
  method: "head",
  path: "/#/",
  summary: "AUT-???: Auth 도메인",
  description: `
    # AUT-???: Auth 도메인

    인증 관련 도메인은 다음과 같습니다.
    - 로그인
    - 로그아웃
    - 토큰 재발급
    - 토큰 검증

    SPARCS SSO를 통해 인증을 진행합니다.

    Access Token과 Refresh Token을 사용하여 인증을 진행합니다.
    따로 DB에서 세션을 저장하진 않습니다.
      `,
  responses: {
    200: {
      description: "Domain Models for Auth Domain",
      content: {
        "application/json": {
          schema: zDomainModels,
        },
      },
    },
  },
});

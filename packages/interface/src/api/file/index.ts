import { z } from "zod";
import { registry } from "@sparcs-students/interface/open-api";
import { zFile } from "./type/file.type";

export * from "./type/file.type";

export * from "./endpoint/apiFil001";
export { default as apiFil001 } from "./endpoint/apiFil001"; // default export 추가

export * from "./endpoint/apiFil002";
export { default as apiFil002 } from "./endpoint/apiFil002";

export * from "./endpoint/apiFil003";
export { default as apiFil003 } from "./endpoint/apiFil003";

// 도메인 모델 스키마 목록
const zDomainModels = z.object({
  file: zFile,
});

registry.registerPath({
  tags: ["File"],
  method: "head",
  path: "/#/",
  summary: "FIL-???: File 도메인",
  description: `
    - File 에 관한 도메인입니다.
    
    # API
    - FIL-001을 통해서 AWS presigned url을 통한 직접 업로드를 진행합니다.
    - FIL-002을 통해서 파일 조회를 위한 presigned GET url을 받습니다.
    
    # 도메인 모델
    - File

    # 이외
    - 이외 파일 관련한 기능은 api 가 아닌, 내부 퍼블릭 서비스를 이용하여 진행합니다.
    - presigned url을 통해 프론트에 띄우는 방식입니다.
      `,
  responses: {
    200: {
      description: "Domain Models for File Domain",
      content: {
        "application/json": {
          schema: zDomainModels,
        },
      },
    },
  },
});

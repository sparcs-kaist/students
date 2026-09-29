import {
  OpenApiGeneratorV31,
  OpenAPIRegistry,
} from "@asteasolutions/zod-to-openapi";

export const registry = new OpenAPIRegistry();
registry.registerComponent("securitySchemes", "bearerAuth", {
  type: "http",
  scheme: "bearer",
  bearerFormat: "JWT",
});

export const restMethod = {
  method: {
    GET: "get",
    POST: "post",
    PUT: "put",
    DELETE: "delete",
  },

  code: {
    GET: 200,
    POST: 201,
    PUT: 200,
    DELETE: 200,
  },
} as const;
// swagger 정렬 옵션
export const swaggerSortBySummary = {
  // operation이 Immutable.js로 구현되어 있기에, getIn을 사용하여 summary 프로퍼티로 정렬
  operationsSorter: (
    a: {
      getIn: (arg0: Array<string>) => string;
    },
    b: {
      getIn: (arg0: Array<string>) => string;
    },
  ) => {
    const result = a
      .getIn(["operation", "summary"])
      .localeCompare(b.getIn(["operation", "summary"]));
    return result;
  },
};

export function generateOpenAPI(): ReturnType<
  OpenApiGeneratorV31["generateDocument"]
> {
  return new OpenApiGeneratorV31(registry.definitions).generateDocument({
    openapi: "3.1.0",
    info: {
      title: "Students API",
      version: "0.0.0",
      description: "API for SPARCS Students",
    },
    tags: [
      {
        name: "Proposal",
        description: "계획서 관리 API",
      },
      {
        name: "Report",
        description: "보고서 관리 API",
      },
      {
        name: "Organization",
        description: "기구 관리 API",
      },
      {
        name: "Meeting",
        description: "의결기구 관리 API",
      },
      {
        name: "User",
        description: "사용자 관리 API",
      },
      {
        name: "Auth",
        description: "인증 관리 API",
      },
      {
        name: "File",
        description: "파일 관리 API",
      },
      {
        name: "Petition",
        description: "청원 관리 API",
      },
      {
        name: "Semester",
        description: "학기 관리 API",
      },
    ],
    security: [{ bearerAuth: [] }],
  });
}

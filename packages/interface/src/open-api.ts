import {
  OpenApiGeneratorV31,
  OpenAPIRegistry,
} from "@asteasolutions/zod-to-openapi";

export const registry = new OpenAPIRegistry();

export const restMethod = {
  GET: "get",
  POST: "post",
  PUT: "put",
  DELETE: "delete",
} as const;

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
  });
}

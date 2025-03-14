import {
  OpenApiGeneratorV31,
  OpenAPIRegistry,
} from "@asteasolutions/zod-to-openapi";

export const registry = new OpenAPIRegistry();

export function generateOpenAPI(): ReturnType<
  OpenApiGeneratorV31["generateDocument"]
> {
  return new OpenApiGeneratorV31(registry.definitions).generateDocument({
    openapi: "3.1.0",
    info: {
      title: "Students API",
      version: "0.1",
      description: "API for SPARCS Students",
    },
  });
}

// REST API 메서드 대소문자 변환용
export const REST_API_METHOD = {
  GET: "get",
  POST: "post",
  PUT: "put",
  PATCH: "patch",
  DELETE: "delete",
} as const;

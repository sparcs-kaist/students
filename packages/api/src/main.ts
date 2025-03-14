import { NestFactory } from "@nestjs/core";
import { env } from "@sparcs-students/api/env";
import express from "express";
import { HttpException } from "@nestjs/common";
import * as swaggerUi from "swagger-ui-express";
import { ZodError } from "zod";
import { generateOpenAPI } from "@sparcs-students/interface/open-api";
import { AppModule } from "./app.module";
import {
  HttpExceptionFilter,
  UnexpectedExceptionFilter,
  ZodErrorFilter,
} from "./common/util/exception.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /* swagger 세팅 시작 */
  // OpenAPI 스펙 생성
  const openApiSpec = generateOpenAPI();
  // Swagger UI 제공 (NestJS 기본 SwaggerModule 사용 불가)
  const swaggerApp = express();
  swaggerApp.use("", swaggerUi.serve, swaggerUi.setup(openApiSpec));
  app.use("/docs", swaggerApp); // localhost:8000/docs 에서 확인 가능
  /* swagger 세팅 끝 */

  app.useGlobalFilters(
    new UnexpectedExceptionFilter(),
    new ZodErrorFilter<ZodError>(),
    new HttpExceptionFilter<HttpException>(),
  ); // 만약 global추가하는 경우 AllExceptionFilter 뒤에 추가하면 됨.
  await app.listen(env.SERVER_PORT);
}
bootstrap();

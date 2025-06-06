import { NestFactory } from "@nestjs/core";
import { HttpException } from "@nestjs/common";
import { ZodError } from "zod";
import session from "express-session";
import cookieParser from "cookie-parser";
import express from "express";
import * as swaggerUi from "swagger-ui-express";
// import settings from "@sparcs-students/api/settings";
import { env } from "@sparcs-students/api/env";
import { generateOpenAPI } from "@sparcs-students/interface/open-api";
import {
  HttpExceptionFilter,
  UnexpectedExceptionFilter,
  ZodErrorFilter,
} from "./common/util/exception.filter";
import { AppModule } from "./app.module";

async function bootstrap() {
  // console.log(`NODE_ENV environment: ${process.env.NODE_ENV}`);
  const app = await NestFactory.create(AppModule);

  // swagger with openapi
  /* swagger 세팅 시작 THX to hama */
  // OpenAPI 스펙 생성

  const openApiSpec = generateOpenAPI();
  // Swagger UI 제공 (NestJS 기본 SwaggerModule 사용 불가)
  // SwaggerModule을 사용하는 NestJS Zod OpenAPI의 경우 ts config strict 를 켜야 함.
  // https://www.npmjs.com/package/@wahyubucil/nestjs-zod-openapi
  const swaggerApp = express();
  swaggerApp.use(
    "",
    swaggerUi.serve,
    swaggerUi.setup(openApiSpec, {
      swaggerOptions: {
        operationsSorter: (
          a: {
            get: (arg0: string) => string;
          },
          b: {
            get: (arg0: string) => string;
          },
        ) => {
          const result = a.get("path").localeCompare(b.get("path"));
          return result;
        },
      },
    }),
  );
  app.use("/docs", swaggerApp);

  /* swagger 세팅 끝 */

  app.use(cookieParser());

  app.use(
    session({
      secret: env.SECRET_KEY,
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 600000 },
    }),
  );
  if (process.env.NODE_ENV === "local") {
    app.enableCors({
      origin: `http://localhost:${process.env.CLIENT_PORT}`,
      credentials: true,
    });
    app.useGlobalFilters(
      new ZodErrorFilter<ZodError>(),
      new HttpExceptionFilter<HttpException>(),
    );
  } else {
    app.useGlobalFilters(
      new UnexpectedExceptionFilter(),
      new ZodErrorFilter<ZodError>(),
      new HttpExceptionFilter<HttpException>(),
    ); // 만약 global추가하는 경우 AllExceptionFilter 뒤에 추가하면 됨.
  }
  await app.listen(env.SERVER_PORT);
}
bootstrap();

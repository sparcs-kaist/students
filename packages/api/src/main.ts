import { NestFactory } from "@nestjs/core";
import { HttpException } from "@nestjs/common";
import { ZodError } from "zod";
import { SwaggerModule } from "@nestjs/swagger";
import session from "express-session";
import cookieParser from "cookie-parser";

import settings from "@sparcs-students/api/settings";
import { env } from "@sparcs-students/api/env";

import {
  HttpExceptionFilter,
  UnexpectedExceptionFilter,
  ZodErrorFilter,
} from "./common/util/exception.filter";
import { AppModule } from "./app.module";

async function bootstrap() {
  // console.log(`NODE_ENV environment: ${process.env.NODE_ENV}`);
  const app = await NestFactory.create(AppModule);
  const document = SwaggerModule.createDocument(
    app,
    settings().getSwaggerConfig(),
  );
  SwaggerModule.setup("api/docs", app, document);
  app.use(cookieParser());

  app.use(
    session({
      secret: env.SECRET_KEY,
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 600000 },
    }),
  );
  if (
    process.env.NODE_ENV === "local" ||
    process.env.NODE_ENV === "development" // TODO: dev의 경우 도메인 필요, 이걸 지금 못 읽고 있음.
  ) {
    app.enableCors({
      origin: `http://localhost:3000`,
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

import { NestFactory } from "@nestjs/core";
import { env } from "@sparcs-students/api/env";
import { HttpException } from "@nestjs/common";
import { ZodError } from "zod";
import { SwaggerModule } from "@nestjs/swagger";
import settings from "@sparcs-students/api/settings";
import { AppModule } from "./app.module";
import {
  HttpExceptionFilter,
  UnexpectedExceptionFilter,
  ZodErrorFilter,
} from "./common/util/exception.filter";

async function bootstrap() {
  console.log(`NODE_ENV environment: ${process.env.NODE_ENV}`);

  const app = await NestFactory.create(AppModule);
  const document = SwaggerModule.createDocument(
    app,
    settings().getSwaggerConfig(),
  );
  SwaggerModule.setup("api/docs", app, document);

  app.useGlobalFilters(
    new UnexpectedExceptionFilter(),
    new ZodErrorFilter<ZodError>(),
    new HttpExceptionFilter<HttpException>(),
  ); // 만약 global추가하는 경우 AllExceptionFilter 뒤에 추가하면 됨.
  await app.listen(env.SERVER_PORT);
}
bootstrap();

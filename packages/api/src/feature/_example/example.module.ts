import { Module } from "@nestjs/common";

import { DrizzleModule } from "src/drizzle/drizzle.module";
import { ExampleService } from "./service/example.service";
import { ExampleController } from "./controller/example.controller";
import { ExampleRepository } from "./repository/example.repository";

@Module({
  imports: [DrizzleModule],
  controllers: [ExampleController],
  providers: [ExampleService, ExampleRepository],
  exports: [],
})
export class ExampleModule {}

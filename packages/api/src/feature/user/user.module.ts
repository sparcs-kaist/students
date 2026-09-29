import { Module } from "@nestjs/common";

import { DrizzleModule } from "src/drizzle/drizzle.module";
import { UserController } from "./controller/user.controller";
import { UserRepository } from "./repository/user.repository";
import { UserService } from "./service/user.service";

@Module({
  imports: [DrizzleModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule {}

import { Module } from "@nestjs/common";
import { DrizzleModule } from "@sparcs-students/api/drizzle/drizzle.module";
import { UserRepository } from "./repository/user.repository";
import { UserPublicService } from "./service/user.public.service";
import { UserService } from "./service/user.service";
import { UserController } from "./controller/user.controller";

@Module({
  imports: [DrizzleModule],
  controllers: [UserController],
  providers: [UserRepository, UserPublicService, UserService],
  exports: [UserPublicService],
})
export class UserModule {}

import { Module } from "@nestjs/common";
import { DrizzleModule } from "@sparcs-students/api/drizzle/drizzle.module";
import { UserRepository } from "./user.repository";
import { UserPublicService } from "./user.public.service";

@Module({
  providers: [UserRepository, UserPublicService],
  exports: [UserPublicService],
  imports: [DrizzleModule],
})
export class UserModule {}

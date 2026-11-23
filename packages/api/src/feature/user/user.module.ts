import { Module } from "@nestjs/common";

import { DrizzleModule } from "@sparcs-students/api/drizzle/drizzle.module";
import { OrganizationModule } from "@sparcs-students/api/feature/organization/organization.module";
import { UserController } from "./controller/user.controller";
import { UserRepository } from "./repository/user.repository";
import { UserService } from "./service/user.service";

@Module({
  imports: [DrizzleModule, OrganizationModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule {}

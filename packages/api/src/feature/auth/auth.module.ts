import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

import { DrizzleModule } from "src/drizzle/drizzle.module";
import { AuthChain } from "@sparcs-students/api/feature/auth/guard/auth.chain";
import { IsPublicCommand } from "@sparcs-students/api/feature/auth/guard/command/isPublic.command";
import { AuthConfig } from "@sparcs-students/api/feature/auth/guard/auth.config";
import { JwtCookieCommand } from "@sparcs-students/api/feature/auth/guard/command/jwt.cookie.command";
import { JwtHeaderCommand } from "@sparcs-students/api/feature/auth/guard/command/jwt.header.command";
import { SidCommand } from "@sparcs-students/api/feature/auth/guard/command/sid.command";
import { RequirePositionCommand } from "./guard/command/requirePosition.command";

import { AuthService } from "./service/auth.service";
import { PositionCheckerService } from "./service/position-checker.service";
import { AuthRepository } from "./repository/auth.repository";
import { AuthController } from "./controller/auth.controller";

@Module({
  imports: [
    DrizzleModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRES_IN,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthRepository,
    AuthChain,
    AuthConfig,
    IsPublicCommand,
    JwtCookieCommand,
    JwtHeaderCommand,
    SidCommand,
    PositionCheckerService,
    RequirePositionCommand,
  ],
  exports: [AuthService, AuthConfig, AuthChain],
})
export class AuthModule {}

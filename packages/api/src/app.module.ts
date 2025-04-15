import { Module } from "@nestjs/common";
import { APP_GUARD, APP_INTERCEPTOR } from "@nestjs/core";

import { AuthConfig } from "@sparcs-students/api/feature/auth/guard/auth.config";
import { AuthGuard } from "@sparcs-students/api/feature/auth/guard/auth.guard";
import { AuthModule } from "@sparcs-students/api/feature/auth/auth.module";
import { LoggingInterceptor } from "@sparcs-students/api/common/interceptor/logging.interceptor";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DrizzleModule } from "./drizzle/drizzle.module";
import { OrganizationModule } from "./feature/organization/organization.module";

@Module({
  imports: [DrizzleModule, OrganizationModule, AuthModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useFactory: async (authConfig: AuthConfig) => {
        const env =
          process.env.NODE_ENV === undefined
            ? "production"
            : process.env.NODE_ENV;
        const authChain = await authConfig.config(env);
        return new AuthGuard(authChain);
      },
      inject: [AuthConfig],
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    AppService,
  ],
})
export class AppModule {}

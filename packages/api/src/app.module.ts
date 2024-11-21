import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DrizzleModule } from "./drizzle/drizzle.module";
import { OrganizationModule } from "./feature/organization/organization.module";
import { ProposalModule } from "./feature/proposal/proposal.module";

@Module({
  imports: [DrizzleModule, OrganizationModule, ProposalModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

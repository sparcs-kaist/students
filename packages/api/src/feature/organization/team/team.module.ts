import { Module } from "@nestjs/common";

import { DrizzleModule } from "src/drizzle/drizzle.module";

@Module({
  imports: [DrizzleModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class TeamModule {}

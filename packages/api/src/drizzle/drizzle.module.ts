import { Module } from "@nestjs/common";
import { TransactionManagerService } from "./drizzle.transaction-manager";
import { drizzleProvider } from "./drizzle.provider";

@Module({
  providers: [...drizzleProvider, TransactionManagerService],
  exports: [...drizzleProvider, TransactionManagerService],
})
export class DrizzleModule {}

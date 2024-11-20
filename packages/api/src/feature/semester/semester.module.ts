import { Module } from "@nestjs/common";
import { DrizzleModule } from "@sparcs-students/api/drizzle/drizzle.module";
import { SemesterRepository } from "./semester.repository";

@Module({ exports: [SemesterRepository], imports: [DrizzleModule] })
export class SemesterModule {}

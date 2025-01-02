import { Module } from "@nestjs/common";
import { DrizzleModule } from "@sparcs-students/api/drizzle/drizzle.module";
import { SemesterRepository } from "./semester.repository";
import { SemesterPublicService } from "./semester.public.service";

@Module({
  providers: [SemesterRepository, SemesterPublicService],
  exports: [SemesterPublicService],
  imports: [DrizzleModule],
})
export class SemesterModule {}

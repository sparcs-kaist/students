import { Module } from "@nestjs/common";
import { DrizzleModule } from "@sparcs-students/api/drizzle/drizzle.module";
import { HalfYearRepository } from "./repository/halfYear.repository";
import { SemesterRepository } from "./repository/semester.repository";
import { SemesterPublicService } from "./service/semester.public.service";

@Module({
  providers: [HalfYearRepository, SemesterRepository, SemesterPublicService],
  exports: [SemesterPublicService],
  imports: [DrizzleModule],
})
export class SemesterModule {}

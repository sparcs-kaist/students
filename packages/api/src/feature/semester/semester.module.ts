import { Module } from "@nestjs/common";
import { DrizzleModule } from "@sparcs-students/api/drizzle/drizzle.module";
import { SemesterRepository } from "./repository/semester.repository";
import { SemesterPublicService } from "./service/semester.public.service";
import { SemesterController } from "./controller/semester.controller";
import { SemesterService } from "./service/semester.service";

@Module({
  providers: [SemesterRepository, SemesterPublicService, SemesterService],
  exports: [SemesterPublicService],
  controllers: [SemesterController],
  imports: [DrizzleModule],
})
export class SemesterModule {}

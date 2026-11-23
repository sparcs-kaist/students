import { Module } from "@nestjs/common";

import { DrizzleModule } from "@sparcs-students/api/drizzle/drizzle.module";

import { NoticeController } from "./controller/notice.controller";
import { NoticeStaffController } from "./controller/notice.staff.controller";
import { NoticeRepository } from "./repository/notice.repository";
import { NoticeService } from "./service/notice.service";

@Module({
  imports: [DrizzleModule],
  controllers: [NoticeController, NoticeStaffController],
  providers: [NoticeRepository, NoticeService],
})
export class NoticeModule {}

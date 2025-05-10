import { Module } from "@nestjs/common";

import { DrizzleModule } from "src/drizzle/drizzle.module";

import { AgendaRepository } from "./repository/agenda.repository";
import { MeetingRepository } from "./repository/meeting.repository";

@Module({
  imports: [DrizzleModule],
  providers: [MeetingRepository, AgendaRepository],
})
export class MeetingModule {}

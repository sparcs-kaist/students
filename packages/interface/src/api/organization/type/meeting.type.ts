// import {
// Check Needed
//   } from "@sparcs-students/interface/common/enum";
import { zId } from "@sparcs-students/interface/common/type/ids";
import {
  zDuration,
  zDurationCreate,
} from "@sparcs-students/interface/common/type/time.type";
import { z } from "zod";
import { zName } from "@sparcs-students/interface/common/stringLength";

// meeting: 회의 엔티티
export const zMeeting = z.object({
  id: zId,
  duration: zDuration,
  name: zName,
});

export const zMeetingRequestCreate = zMeeting
  .omit({
    id: true,
    duration: true,
  })
  .extend({ duration: zDurationCreate });

export const zMeetingRequestUpdate = zMeeting;

// export const zMeetingResponse = zMeeting.extend({
// Check Needed
// });

export type IMeeting = z.infer<typeof zMeeting>;
// export type IMeetingResponse = z.infer<
//     typeof zMeetingResponse
// >;
export type IMeetingRequestUpdate = z.infer<typeof zMeetingRequestUpdate>;
export type IMeetingRequestCreate = z.infer<typeof zMeetingRequestCreate>;

// agenda: 안건 엔티티
export const zAgenda = z.object({
  id: zId,
  meeting: zMeeting.pick({ id: true }),
  accepted: z.boolean(),
  submittedAt: z.date(),
  postedAt: z.date(),
});

export const zAgendaRequestCreate = zAgenda.omit({
  id: true,
});

export const zAgendaRequestUpdate = zAgenda;

export const zAgendaResponse = zAgenda.extend({
  // Check Needed
  meeting: zMeeting.pick({ id: true }),
});

export type IAgenda = z.infer<typeof zAgenda>;
export type IAgendaResponse = z.infer<typeof zAgendaResponse>;
export type IAgendaRequestUpdate = z.infer<typeof zAgendaRequestUpdate>;
export type IAgendaRequestCreate = z.infer<typeof zAgendaRequestCreate>;

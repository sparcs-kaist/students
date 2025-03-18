import { IMeeting } from "@sparcs-students/interface/api/organization/type/meeting.type";
import { InferSelectModel } from "drizzle-orm";

import { Meeting } from "@sparcs-students/api/drizzle/schema/meeting.schema";

export type MeetingDBResult = InferSelectModel<typeof Meeting>;

export class MMeeting implements IMeeting {
  id: IMeeting["id"];

  duration: IMeeting["duration"];

  name: IMeeting["name"];

  constructor(data: IMeeting) {
    Object.assign(this, data);
  }

  static fromDBResult(result: MeetingDBResult) {
    return new MMeeting({
      id: result.id,
      duration: {
        startTerm: result.startTerm,
        endTerm: result.endTerm,
      },
      name: result.name,
    });
  }
}

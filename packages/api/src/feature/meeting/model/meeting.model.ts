import { IMeeting } from "@sparcs-students/interface/api/meeting/type/meeting.type";

import { MEntity } from "@sparcs-students/api/common/base/entity.model";

export interface IMeetingCreate {
  semester: IMeeting["semester"];
  meetingTypeEnum: IMeeting["meetingTypeEnum"];
  name: IMeeting["name"];
  detail: IMeeting["detail"];
}

export class MMeeting extends MEntity implements IMeeting {
  static modelName = "Meeting";

  semester: IMeeting["semester"];

  meetingTypeEnum: IMeeting["meetingTypeEnum"];

  name: IMeeting["name"];

  detail: IMeeting["detail"];

  startTerm: IMeeting["startTerm"];

  endTerm: IMeeting["endTerm"];

  constructor(data: IMeeting) {
    super();
    Object.assign(this, data);
  }
}

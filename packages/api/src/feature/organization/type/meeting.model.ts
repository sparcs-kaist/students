import { IMeeting } from "@sparcs-students/interface/api/meeting/type/meeting.type";

import { MEntity } from "@sparcs-students/api/common/base/entity.model";

export interface IMeetingCreate {
  duration: IMeeting["duration"];
  name: IMeeting["name"];
  detail: IMeeting["detail"];
}

export class MMeeting extends MEntity implements IMeeting {
  static modelName = "Meeting";

  duration: IMeeting["duration"];

  name: IMeeting["name"];

  detail: IMeeting["detail"];

  constructor(data: IMeeting) {
    super();
    Object.assign(this, data);
  }
}

import { IStaff } from "@sparcs-students/interface/api/organization/type/organization.student.type";
import { MEntity } from "@sparcs-students/api/common/base/entity.model";

export interface IStaffCreate {
  student: IStaff["student"];

  duration: IStaff["duration"];
}

export class MStaff extends MEntity implements IStaff {
  static modelName = "Staff";

  student: IStaff["student"];

  duration: IStaff["duration"];

  constructor(data: IStaff) {
    super();
    Object.assign(this, data);
  }
}

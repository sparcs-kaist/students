import { IStudent } from "@sparcs-students/interface/api/user/type/user.type";
import { MEntity } from "@sparcs-students/api/common/base/entity.model";

export interface IStudentCreate {
  studentNumber: IStudent["studentNumber"];

  userId: number;

  departmentId: number;
}

export class MStudent extends MEntity implements IStudent {
  static modelName = "Student";

  studentNumber: IStudent["studentNumber"];

  user: IStudent["user"];

  department: IStudent["department"];

  constructor(data: IStudent) {
    super();
    Object.assign(this, data);
  }
}

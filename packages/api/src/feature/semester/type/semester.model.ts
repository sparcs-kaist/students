import { ISemester } from "@sparcs-students/interface/api/semester/type/semester.type";

export interface ISemesterCreate {
  name: ISemester["name"];
  year: ISemester["year"];
  semesterEnum: ISemester["semesterEnum"];
  startTerm: ISemester["startTerm"];
  endTerm: ISemester["endTerm"];
}

export class MSemester implements ISemester {
  static modelName = "Semester";

  id: ISemester["id"];

  name: ISemester["name"];

  year: ISemester["year"];

  semesterEnum: ISemester["semesterEnum"];

  startTerm: ISemester["startTerm"];

  endTerm: ISemester["endTerm"];

  constructor(data: ISemester) {
    Object.assign(this, data);
  }
}

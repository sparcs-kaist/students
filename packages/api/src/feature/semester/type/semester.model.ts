import { ISemester } from "@sparcs-students/interface/api/semester/type/semester.type";
import { InferSelectModel } from "drizzle-orm";

import { Semester } from "@sparcs-students/api/drizzle/schema/semester.schema";
import { SemesterEnum } from "@sparcs-students/interface/common/enum/semester.enum";

export type SemesterDBResult = InferSelectModel<typeof Semester>;

export class MSemester implements ISemester {
  id: ISemester["id"];

  name: ISemester["name"];

  year: ISemester["year"];

  semesterEnum: ISemester["semesterEnum"];

  duration: ISemester["duration"];

  constructor(data: ISemester) {
    Object.assign(this, data);
  }

  static fromDBResult(result: SemesterDBResult) {
    return new MSemester({
      ...result,
      semesterEnum: result.semesterEnum as SemesterEnum,
      duration: { startTerm: result.startTerm, endTerm: result.endTerm },
    });
  }
}

import { IHalfYear } from "@sparcs-students/interface/api/semester/type/semester.type";
import { InferSelectModel } from "drizzle-orm";

import { HalfYear } from "@sparcs-students/api/drizzle/schema/semester.schema";
import { MSemester } from "./semester.model";

export type HalfYearDBResult = InferSelectModel<typeof HalfYear> & {
  regularSemester: MSemester;
  seasonalSemester: MSemester;
};

export class MHalfYear implements IHalfYear {
  id: IHalfYear["id"];

  name: IHalfYear["name"];

  year: IHalfYear["year"];

  halfYearEnum: IHalfYear["halfYearEnum"];

  regularSemester: IHalfYear["regularSemester"];

  seasonalSemester: IHalfYear["seasonalSemester"];

  duration: IHalfYear["duration"];

  constructor(data: IHalfYear) {
    Object.assign(this, data);
  }

  static fromDBResult(result: HalfYearDBResult) {
    return new MHalfYear({
      ...result,

      duration: {
        startTerm: result.regularSemester.duration.startTerm,
        endTerm: result.seasonalSemester.duration.endTerm,
      },
    });
  }
}

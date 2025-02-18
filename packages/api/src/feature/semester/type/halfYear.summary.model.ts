import { InferSelectModel } from "drizzle-orm";

import { IHalfYearSummary } from "@sparcs-students/interface/api/semester/type/semester.type";
import { HalfYear } from "@sparcs-students/api/drizzle/schema/semester.schema";
import { MHalfYear } from "./halfYear.model";

export type HalfYearSummaryDBResult = Pick<
  InferSelectModel<typeof HalfYear>,
  "id" | "name" | "year" | "halfYearEnum"
>;

export class VHalfYearSummary implements IHalfYearSummary {
  id: IHalfYearSummary["id"];

  name: IHalfYearSummary["name"];

  year: IHalfYearSummary["year"];

  halfYearEnum: IHalfYearSummary["halfYearEnum"];

  constructor(halfYearSummary: IHalfYearSummary);
  constructor(halfYear: MHalfYear);
  constructor(param: IHalfYearSummary | MHalfYear) {
    if (param instanceof MHalfYear) {
      this.id = param.id;
      this.name = param.name;
      this.year = param.year;
      this.halfYearEnum = param.halfYearEnum;
    } else {
      Object.assign(this, param);
    }
  }

  static fromDBResult(result: HalfYearSummaryDBResult) {
    return new VHalfYearSummary(result);
  }
}

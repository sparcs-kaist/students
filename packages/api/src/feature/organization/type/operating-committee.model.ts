import { IOperatingCommittee } from "@sparcs-students/interface/api/organization/type/organization.type";
import { InferSelectModel } from "drizzle-orm";

import { OperatingCommittee } from "@sparcs-students/api/drizzle/schema/organization.schema";

export type OperatingCommitteeDBResult = InferSelectModel<
  typeof OperatingCommittee
>;

export class MOperatingCommittee implements IOperatingCommittee {
  id: IOperatingCommittee["id"];

  organization: IOperatingCommittee["organization"];

  name: IOperatingCommittee["name"];

  duration: IOperatingCommittee["duration"];

  nameEng: IOperatingCommittee["nameEng"];

  constructor(data: IOperatingCommittee) {
    Object.assign(this, data);
  }

  static fromDBResult(result: OperatingCommitteeDBResult) {
    return new MOperatingCommittee({
      ...result,
      duration: {
        startTerm: result.startTerm,
        endTerm: result.endTerm,
      },
      organization: {
        id: result.organizationId,
      },
    });
  }
}

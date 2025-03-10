import { IOperatingCommitteeMember } from "@sparcs-students/interface/api/organization/type/organization.student.type";
import { InferSelectModel } from "drizzle-orm";

import { OperatingCommitteeMember } from "@sparcs-students/api/drizzle/schema/organization.schema";

export type OperatingCommitteeMemberDBResult = InferSelectModel<
  typeof OperatingCommitteeMember
>;

export class MOperatingCommitteeMember implements IOperatingCommitteeMember {
  id: IOperatingCommitteeMember["id"];

  operatingCommittee: IOperatingCommitteeMember["operatingCommittee"];

  student: IOperatingCommitteeMember["student"];

  title: IOperatingCommitteeMember["title"];

  legalBasis: IOperatingCommitteeMember["legalBasis"];

  duration: IOperatingCommitteeMember["duration"];

  constructor(data: IOperatingCommitteeMember) {
    Object.assign(this, data);
  }

  static fromDBResult(result: OperatingCommitteeMemberDBResult) {
    return new MOperatingCommitteeMember({
      ...result,
      duration: {
        startTerm: result.startTerm,
        endTerm: result.endTerm,
      },
      operatingCommittee: {
        id: result.operatingCommitteeId,
      },
      student: {
        id: result.studentId,
      },
    });
  }
}

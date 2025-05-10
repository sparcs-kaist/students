import { zExtractId, zId } from "@sparcs-students/interface/common/type/ids";
import { z } from "zod";
import { zOrganization } from "@sparcs-students/interface/api/organization/type/organization.type";
import { zSemester } from "@sparcs-students/interface/api/semester/type/semester.type";

import { zRevisionBase } from "@sparcs-students/interface/common/type/revision-base.type";
import { zDocumentItemName } from "@sparcs-students/interface/common/stringLength";

// BudgetReportExpense: 예산안 각 행 엔티티
export const zOperatingCommitteeMeeting = z.object({
  id: zId,
  organization: zExtractId(zOrganization),
  semester: zExtractId(zSemester),
});

export type IOperatingCommitteeMeeting = z.infer<
  typeof zOperatingCommitteeMeeting
>;

// OperatingCommitteeMeeting: 운위 회의 엔티티
export const zOperatingCommitteeMeetingRevision = z
  .object({
    id: zId,
    operatingCommitteeMeeting: zExtractId(zOperatingCommitteeMeeting), // 원본
    name: zDocumentItemName,
    place: z.string(),
    note: z.string(),
    startTerm: z.date(),
    endTerm: z.date(),
    operatingCommitteeMeetingResults: z.array(
      z.object({
        name: z.string(),
        decisionText: z.string(),
        attendance: z.coerce.number(),
        agree: z.coerce.number(),
        disagree: z.coerce.number(),
        abstain: z.coerce.number(),
        approval: z.coerce.boolean(),
        note: z.string(),
      }),
    ),
  })
  .merge(zRevisionBase);

export type IOperatingCommitteeMeetingRevision = z.infer<
  typeof zOperatingCommitteeMeetingRevision
>;

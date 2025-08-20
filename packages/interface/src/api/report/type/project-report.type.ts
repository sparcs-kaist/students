import { zExtractId, zId } from "@sparcs-students/interface/common/type/ids";
import { z } from "zod";
import {
  zOrganization,
  zTeam,
} from "@sparcs-students/interface/api/organization/type/organization.type";
import { zSemester } from "@sparcs-students/interface/api/semester/type/semester.type";
import { zStudent } from "@sparcs-students/interface/api/user/type/user.type";
import { zDuration } from "@sparcs-students/interface/common/type/time.type";
import {
  zDocumentItemName,
  zMoney,
} from "@sparcs-students/interface/common/stringLength";
import { zRevisionBase } from "@sparcs-students/interface/common/type/revision-base.type";

import { zProjectProposal } from "@sparcs-students/interface/api/proposal/type/project-proposal.type";
import {
  BudgetClassExpenseEnum,
  BudgetDivisionExpenseEnum,
  BudgetDomainEnum,
} from "@sparcs-students/interface/common/enum";

// ProjectReport: 사업계획서 각 행 엔티티
export const zProjectReport = z.object({
  id: zId,
  organization: zExtractId(zOrganization),
  semester: zExtractId(zSemester),
  projectProposal: zExtractId(zProjectProposal),
});

export type IProjectReport = z.infer<typeof zProjectReport>;

export const zProjectReportRevision = z
  .object({
    id: zId,
    projectReport: zExtractId(zProjectReport),
    name: zDocumentItemName,
    method: z.string(),
    prepareDuration: zDuration.optional(),
    duration: zDuration.optional(), // null: 반기 단위 상시 사업
    timelines: z.array(
      z.object({
        // name: z.string().max(255),
        projectReportRevision: z.object({ id: zId }).optional(),
        duration: zDuration,
        detail: z.string(),
        note: z.string().optional(),
      }),
    ),
    team: zExtractId(zTeam),
    manager: zExtractId(zStudent).nullable(),
    detail: z.string(),
    participation: z.string(),
    result: z.string(),
    unmet: z.string(),
    note: z.string(),
  })
  .merge(zRevisionBase);

export type IProjectReportRevision = z.infer<typeof zProjectReportRevision>;

export const zProjectReportListRequestGet = z.object({
  organization: zId,
  semester: zId,
});

export const zProjectReportListResponse = z.object({
  organization: zExtractId(zOrganization),
  organizationName: z.string(),
  semester: zExtractId(zSemester),
  organizationPresident: zExtractId(zStudent),
  organizationPresidentName: z.string(),
  submitDate: z.coerce.date(),
  projects: z.array(
    z.object({
      projectReport: zExtractId(zProjectReport),
      projectName: zDocumentItemName,
      duration: zDuration,
      acceptedStatus: z.string(),
    }),
  ),
});

export const zProjectReportDetailRequestGet = z.object({ projectReport: zId });

export const zProjectReportDetailResponse = zProjectReport
  .pick({ projectProposal: true })
  .merge(zProjectReportRevision)
  .extend({
    budgetExpenses: z.array(
      z.object({
        id: zId,
        name: zDocumentItemName,
        budgetDomainEnum: z.nativeEnum(BudgetDomainEnum),
        budgetDivisionExpenseEnum: z.nativeEnum(BudgetDivisionExpenseEnum),
        budgetClassExpenseEnum: z.nativeEnum(BudgetClassExpenseEnum),
        proposalAmount: zMoney,
        reportAmount: zMoney,
        detail: z.string(),
        note: z.string(),
      }),
    ),
  });

export const zProjectReportRequestCreate = zProjectReport.omit({ id: true });

export const zProjectReportResponse = zProjectReport.pick({ id: true });

export const zProjectReportRevisionListRequestGet = zProjectReport.pick({
  id: true,
});

export const zProjectReportRevisionListResponse = z.array(
  zProjectReportRevision.pick({ id: true }),
);

export const zProjectReportRevisionDetailRequestGet =
  zProjectReportRevision.pick({ id: true });

export const zProjectReportRevisionDetailResponse = // Expense 추가
  zProjectReportRevision.extend({
    budgetExpenses: z.array(
      z.object({
        id: zId,
        name: zDocumentItemName,
        budgetDomainEnum: z.nativeEnum(BudgetDomainEnum),
        budgetDivisionExpenseEnum: z.nativeEnum(BudgetDivisionExpenseEnum),
        budgetClassExpenseEnum: z.nativeEnum(BudgetClassExpenseEnum),
        proposalAmount: zMoney,
        reportAmount: zMoney,
        detail: z.string(),
        note: z.string(),
      }),
    ),
  });

export const zProjectReportSubmitRequestUpdate = zProjectReportRevision.pick({
  id: true,
});

export const zProjectReportSubmitResponse = zProjectReportRevision.pick({
  id: true,
});

export const zProjectReportRevisionRequestCreate = zProjectReportRevision.omit({
  id: true,
});

export const zProjectReportRevisionRequestUpdate = zProjectReportRevision;

export const zProjectReportRevisionResponse = zProjectReportRevision.pick({
  id: true,
});

export type IProjectReportListRequestGet = z.infer<
  typeof zProjectReportListRequestGet
>;
export type IProjectReportListReponse = z.infer<
  typeof zProjectReportListResponse
>;
export type IProjectReportDetailRequestGet = z.infer<
  typeof zProjectReportDetailRequestGet
>;
export type IProjectReportDetailResponse = z.infer<
  typeof zProjectReportDetailResponse
>;
export type IProjectReportRequestCreate = z.infer<
  typeof zProjectReportRequestCreate
>;
export type IProjectReportResponse = z.infer<typeof zProjectReportResponse>;
export type IProjectReportRevisionListRequestGet = z.infer<
  typeof zProjectReportRevisionListRequestGet
>;
export type IProjectReportRevisionListResponse = z.infer<
  typeof zProjectReportRevisionListResponse
>;
export type IProjectReportRevisionDetailRequestGet = z.infer<
  typeof zProjectReportRevisionDetailRequestGet
>;
export type IProjectReportRevisionDetailResponse = z.infer<
  typeof zProjectReportRevisionDetailResponse
>;
export type IProjectReportRevisionRequestCreate = z.infer<
  typeof zProjectReportRevisionRequestCreate
>;
export type IProjectReportRevisionRequestUpdate = z.infer<
  typeof zProjectReportRevisionRequestUpdate
>;
export type IProjectReportRevisionResponse = z.infer<
  typeof zProjectReportRevisionResponse
>;
export type IProjectReportSubmitRequestUpdate = z.infer<
  typeof zProjectReportSubmitRequestUpdate
>;
export type IProjectReportSubmitResponse = z.infer<
  typeof zProjectReportSubmitResponse
>;

import z from "zod";
import { zId, zExtractId } from "@sparcs-students/interface/common/type/ids";
import { zFile } from "@sparcs-students/interface/api/file/type/file.type";
import { zSemester } from "@sparcs-students/interface/api/semester/type/semester.type";
import {
  zOperatingCommittee,
  zOrganization,
  zTeam,
} from "@sparcs-students/interface/api/organization/type/organization.type";
import { zRevisionBase } from "@sparcs-students/interface/common/type/revision-base.type";

export const zOperationReport = z.object({
  id: zId,
  organization: zExtractId(zOrganization),
  semester: zExtractId(zSemester),
});

export type IOperationReport = z.infer<typeof zOperationReport>;

export const zOperationReportRevision = z
  .object({
    id: zId,
    operationReport: zExtractId(zOperationReport),
    organizationDiagramFile: zExtractId(zFile).openapi({
      description: "조직도 파일",
    }),
    // TODO: 리크루팅 관련 추가하기
    note: z.string(),

    operatingCommitteeOperation: z
      .object({
        operatingCommittee: zExtractId(zOperatingCommittee),
        note: z.string().openapi({
          description: "운영위원회 운영 계획 비고",
        }),
      })
      .array()
      .openapi({
        description: "운영위원회 운영 계획",
      }),

    teamOperation: z
      .object({
        team: zExtractId(zTeam),
        description: z.string().openapi({
          description: "활동 요약",
        }),
        // 국서/TF원 명단, 사업명의 경우 fk로 연결
      })
      .array()
      .openapi({
        description: "국서/TF 운영 계획",
      }),
  })
  .merge(zRevisionBase);

export type IOperationReportRevision = z.infer<typeof zOperationReportRevision>;

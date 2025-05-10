import z from "zod";
import { zAgenda } from "@sparcs-students/interface/api/meeting/type/agenda.type";
import { zExtractId } from "./ids";

export enum DocumentItemStatusEnum {
  Incomplete = 1, // 미제출
  UASubmitted = 2, // 제출
  UAAccepted = 3, // 승인
  UARejected = 4, // 반려
  UAProgress = 5, // 검토중
  UAReviseNeeded = 6, // 수정요청
  UALateAccepted = 7, // 사후승인
  COCSubmitted = 8, // 중앙 제출
  COCAccepted = 9, // 중앙 승인
  COCRejected = 10, // 중앙 반려
  COCProgress = 11, // 중앙 검토중
  COCReviseNeeded = 12, // 중앙 수정요청
  COCLateAccepted = 13, // 중앙 사후승인
  GSRCSubmitted = 14, // 중앙 제출
  GSRCAccepted = 15, // 중앙 승인
  GSRCRejected = 16, // 중앙 반려
  GSRCProgress = 17, // 중앙 검토중
  GSRCReviseNeeded = 18, // 중앙 수정요청
  GSRCLateAccepted = 19, // 중앙 사후승인
}

export const zRevisionBase = z.object({
  submittedAt: z.date().optional(),
  documentStatusEnum: z.nativeEnum(DocumentItemStatusEnum),
  cogAgenda: zExtractId(zAgenda).optional(),
  gsrcAgenda: zExtractId(zAgenda).optional(),
});

export type IRevisionBase = z.infer<typeof zRevisionBase>;

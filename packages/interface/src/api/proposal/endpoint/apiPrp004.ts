import { HttpStatusCode } from "axios";
import { z } from "zod";
import { zUserName } from "@sparcs-students/interface/common/stringLength";
import { zId } from "@sparcs-students/interface/common/type/ids";

/**
 * @version v0.1
 * @description 기구장단 권한으로 새로운 project proposal 을 만들어 냅니다.
 * 첫번째 revision도 같이 생성합니다.
 *
 */

export const ApiPrp004RequestUrl =
  "/president/proposals/project-proposals/project-proposal";

export const ApiPrp004Method = "POST";

export const ApiPrp004RequestBody = z.object({
  projectName: z.string().max(255),
  startTerm: z.coerce.date(),
  endTerm: z.coerce.date(),
  teamName: z.string().max(30),
  managerName: zUserName,
  purpose: z.string(),
  target: z.string(),
  detail: z.string(),
  timeLines: z.array(
    z.object({
      detail: z.string(),
      startTerm: z.coerce.date(),
      endTerm: z.coerce.date(),
      note: z.string().optional(),
    }),
  ),
  // 사업 계획서 검토 내역
});

export const ApiPrp004ResponseBody = z.object({
  projectProposalId: zId,
});

export const apiPrp004 = {
  url: ApiPrp004RequestUrl,
  method: ApiPrp004Method,
  requestBody: ApiPrp004RequestBody,
  responseBodyMap: {
    [HttpStatusCode.Created]: ApiPrp004ResponseBody,
  },
};

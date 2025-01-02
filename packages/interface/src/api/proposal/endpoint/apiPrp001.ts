import { HttpStatusCode } from "axios";
import { z } from "zod";

import {
  zOrgName,
  zUserName,
} from "@sparcs-students/interface/common/stringLength";
import { zId } from "@sparcs-students/interface/common/type/ids";
import { AgendaAcceptedStatusE } from "@sparcs-students/interface/common/enum";

/**
 * @version v0.1
 * @description semesterId랑 organizationId로 사업계획서 뷰어 내용을 받아옵니다.
 */

const url = () => `/student/proposals/project-proposals`;
const method = "GET";
export const ApiPrp001RequestUrl = "/student/proposals/project-proposals";

const requestParam = z.object({});

const requestQuery = z.object({
  semesterId: zId,
  organizationId: zId,
});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    organizationId: zId,
    organizationName: zOrgName,
    semesterId: zId,
    organizationPresidentId: zId,
    organizationPresidentName: zUserName,
    submitDate: z.date(),
    projects: z
      .object({
        projectProposalId: zId,
        name: z.coerce.string().max(255),
        startTerm: z.date(),
        endTerm: z.date(),
        acceptedStatus: z.nativeEnum(AgendaAcceptedStatusE),
      })
      .array(),
  }),
};

const responseErrorMap = {};

const apiPrp001 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiPrp001RequestParam = z.infer<typeof apiPrp001.requestParam>;
type ApiPrp001RequestQuery = z.infer<typeof apiPrp001.requestQuery>;
type ApiPrp001RequestBody = z.infer<typeof apiPrp001.requestBody>;
type ApiPrp001ResponseOK = z.infer<(typeof apiPrp001.responseBodyMap)[200]>;

export default apiPrp001;

export type {
  ApiPrp001RequestParam,
  ApiPrp001RequestQuery,
  ApiPrp001RequestBody,
  ApiPrp001ResponseOK,
};

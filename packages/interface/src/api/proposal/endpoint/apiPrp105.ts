import { HttpStatusCode } from "axios";
import { z } from "zod";
import { zId } from "@sparcs-students/interface/common/type/ids";
import { zCode } from "@sparcs-students/interface/common/type/codes";

import {
  zProjectProposalTimelineRequestUpdate,
  zProjectProposalTimelineResponse,
} from "../type/project-proposal.type";

/**
 * @version v0.1
 * @description 매니저(organizationManager) 권한으로 타임라인(timeline)를 수정합니다.
 */

const url = () => `/manager/proposals/timeline/update`;
const method = "POST";
export const ApiPrp105RequestUrl = "/manager/proposals/timeline/update";

const requestParam = z.object({});

const requestQuery = z.object({});

const requestBody = z.object({
  organizationId: zId,
  code: zCode,
  projectProposalTimeline: zProjectProposalTimelineRequestUpdate,
});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    projectProposalTimeline: zProjectProposalTimelineResponse,
  }),
};

const responseErrorMap = {};

const apiPrp105 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiPrp105RequestParam = z.infer<typeof apiPrp105.requestParam>;
type ApiPrp105RequestQuery = z.infer<typeof apiPrp105.requestQuery>;
type ApiPrp105RequestBody = z.infer<typeof apiPrp105.requestBody>;
type ApiPrp105ResponseOk = z.infer<(typeof apiPrp105.responseBodyMap)[200]>;

export default apiPrp105;

export type {
  ApiPrp105RequestParam,
  ApiPrp105RequestQuery,
  ApiPrp105RequestBody,
  ApiPrp105ResponseOk,
};

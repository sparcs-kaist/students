import { HttpStatusCode } from "axios";
import { z } from "zod";

import {
  zProjectReportTimelineRequestCreate,
  zProjectReportTimelineResponse,
} from "../type/project-report-timeline.type";

/**
 * @version v0.1
 * @description
 */

const url = () => ``;
const method = "";
export const ApiRpt009RequestUrl = "";

const requestParam = z.object({});

const requestQuery = z.object({});

const requestBody = z.object({
  projectReportTimeline: zProjectReportTimelineRequestCreate,
});

const responseBodyMap = {
  [HttpStatusCode.Created]: z.object({
    projectReportTimeline: zProjectReportTimelineResponse,
  }),
};

const responseErrorMap = {};

const apiRpt009 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiRpt009RequestParam = z.infer<typeof apiRpt009.requestParam>;
type ApiRpt009RequestQuery = z.infer<typeof apiRpt009.requestQuery>;
type ApiRpt009RequestBody = z.infer<typeof apiRpt009.requestBody>;
type ApiRpt009ResponseCreated = z.infer<
  (typeof apiRpt009.responseBodyMap)[201]
>;

export default apiRpt009;

export type {
  ApiRpt009RequestParam,
  ApiRpt009RequestQuery,
  ApiRpt009RequestBody,
  ApiRpt009ResponseCreated,
};

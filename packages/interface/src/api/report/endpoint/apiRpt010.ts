import { HttpStatusCode } from "axios";
import { z } from "zod";

import {
  zProjectReportTimelineRequestUpdate,
  zProjectReportTimelineResponse,
} from "../type/project-report-timeline.type";

/**
 * @version v0.1
 * @description
 */

const url = () => ``;
const method = "";
export const ApiRpt010RequestUrl = "";

const requestParam = z.object({});

const requestQuery = z.object({});

const requestBody = z.object({
  projectReportTimeline: zProjectReportTimelineRequestUpdate,
});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    projectReportTimeline: zProjectReportTimelineResponse,
  }),
};

const responseErrorMap = {};

const apiRpt010 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiRpt010RequestParam = z.infer<typeof apiRpt010.requestParam>;
type ApiRpt010RequestQuery = z.infer<typeof apiRpt010.requestQuery>;
type ApiRpt010RequestBody = z.infer<typeof apiRpt010.requestBody>;
type ApiRpt010ResponseOk = z.infer<(typeof apiRpt010.responseBodyMap)[200]>;

export default apiRpt010;

export type {
  ApiRpt010RequestParam,
  ApiRpt010RequestQuery,
  ApiRpt010RequestBody,
  ApiRpt010ResponseOk,
};

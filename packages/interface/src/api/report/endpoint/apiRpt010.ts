import { HttpStatusCode } from "axios";
import { z } from "zod";

import { zProjectReportTimelineRequestDelete } from "../type/project-report-timeline.type";

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
  projectReportTimeline: zProjectReportTimelineRequestDelete,
});

const responseBodyMap = {
  [HttpStatusCode.NoContent]: z.object({}),
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
type ApiRpt010ResponseNoContent = z.infer<
  (typeof apiRpt010.responseBodyMap)[204]
>;

export default apiRpt010;

export type {
  ApiRpt010RequestParam,
  ApiRpt010RequestQuery,
  ApiRpt010RequestBody,
  ApiRpt010ResponseNoContent,
};

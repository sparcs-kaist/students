import { HttpStatusCode } from "axios";
import { z } from "zod";

import { zProjectReportTimelineRequestDelete } from "../type/project-report-timeline.type";

/**
 * @version v0.1
 * @description
 */

const url = () => ``;
const method = "";
export const ApiRpt011RequestUrl = "";

const requestParam = z.object({});

const requestQuery = z.object({});

const requestBody = z.object({
  projectReportTimeline: zProjectReportTimelineRequestDelete,
});

const responseBodyMap = {
  [HttpStatusCode.NoContent]: z.object({}),
};

const responseErrorMap = {};

const apiRpt011 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiRpt011RequestParam = z.infer<typeof apiRpt011.requestParam>;
type ApiRpt011RequestQuery = z.infer<typeof apiRpt011.requestQuery>;
type ApiRpt011RequestBody = z.infer<typeof apiRpt011.requestBody>;
type ApiRpt011ResponseNoContent = z.infer<
  (typeof apiRpt011.responseBodyMap)[204]
>;

export default apiRpt011;

export type {
  ApiRpt011RequestParam,
  ApiRpt011RequestQuery,
  ApiRpt011RequestBody,
  ApiRpt011ResponseNoContent,
};

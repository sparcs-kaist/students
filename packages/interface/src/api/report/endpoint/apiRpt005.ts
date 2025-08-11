import { HttpStatusCode } from "axios";
import { z } from "zod";

import {
  zProjectReportRequestCreate,
  zProjectReportResponse,
} from "../type/project-report.type";

/**
 * @version v0.1
 * @description
 */

const url = () => ``;
const method = "";
export const ApiRpt005RequestUrl = "";

const requestParam = z.object({});

const requestQuery = z.object({});

const requestBody = z.object({ projectReport: zProjectReportRequestCreate });

const responseBodyMap = {
  [HttpStatusCode.Created]: z.object({
    projectReport: zProjectReportResponse,
  }),
};

const responseErrorMap = {};

const apiRpt005 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiRpt005RequestParam = z.infer<typeof apiRpt005.requestParam>;
type ApiRpt005RequestQuery = z.infer<typeof apiRpt005.requestQuery>;
type ApiRpt005RequestBody = z.infer<typeof apiRpt005.requestBody>;
type ApiRpt005ResponseCreated = z.infer<
  (typeof apiRpt005.responseBodyMap)[201]
>;

export default apiRpt005;

export type {
  ApiRpt005RequestParam,
  ApiRpt005RequestQuery,
  ApiRpt005RequestBody,
  ApiRpt005ResponseCreated,
};

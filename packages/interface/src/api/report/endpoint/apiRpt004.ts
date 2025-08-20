import { HttpStatusCode } from "axios";
import { z } from "zod";

import {
  zProjectReportRevisionDetailRequestGet,
  zProjectReportRevisionDetailResponse,
} from "../type/project-report.type";

/**
 * @version v0.1
 * @description
 */

const url = () => ``;
const method = "";
export const ApiRpt004RequestUrl = "";

const requestParam = z.object({});

const requestQuery = z.object({});

const requestBody = z.object({
  projectReportRevision: zProjectReportRevisionDetailRequestGet,
});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    projectReportRevision: zProjectReportRevisionDetailResponse,
  }),
};

const responseErrorMap = {};

const apiRpt004 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiRpt004RequestParam = z.infer<typeof apiRpt004.requestParam>;
type ApiRpt004RequestQuery = z.infer<typeof apiRpt004.requestQuery>;
type ApiRpt004RequestBody = z.infer<typeof apiRpt004.requestBody>;
type ApiRpt004ResponseOk = z.infer<(typeof apiRpt004.responseBodyMap)[200]>;

export default apiRpt004;

export type {
  ApiRpt004RequestParam,
  ApiRpt004RequestQuery,
  ApiRpt004RequestBody,
  ApiRpt004ResponseOk,
};

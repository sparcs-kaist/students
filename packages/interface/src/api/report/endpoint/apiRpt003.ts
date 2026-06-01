import { HttpStatusCode } from "axios";
import { z } from "zod";

import {
  zProjectReportRevisionListRequestGet,
  zProjectReportRevisionListResponse,
} from "../type/project-report.type";

/**
 * @version v0.1
 * @description
 */

const url = () => ``;
const method = "";
export const ApiRpt003RequestUrl = "";

const requestParam = z.object({});

const requestQuery = z.object({});

const requestBody = z.object({
  projectReport: zProjectReportRevisionListRequestGet,
});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    projectReportRevisions: zProjectReportRevisionListResponse,
  }),
};

const responseErrorMap = {};

const apiRpt003 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiRpt003RequestParam = z.infer<typeof apiRpt003.requestParam>;
type ApiRpt003RequestQuery = z.infer<typeof apiRpt003.requestQuery>;
type ApiRpt003RequestBody = z.infer<typeof apiRpt003.requestBody>;
type ApiRpt003ResponseOk = z.infer<(typeof apiRpt003.responseBodyMap)[200]>;

export default apiRpt003;

export type {
  ApiRpt003RequestParam,
  ApiRpt003RequestQuery,
  ApiRpt003RequestBody,
  ApiRpt003ResponseOk,
};

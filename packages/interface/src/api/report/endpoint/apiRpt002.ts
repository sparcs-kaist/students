import { HttpStatusCode } from "axios";
import { z } from "zod";

import {
  zProjectReportDetailRequestGet,
  zProjectReportDetailResponse,
} from "../type/project-report.type";

/**
 * @version v0.1
 * @description
 */

const url = () => ``;
const method = "";
export const ApiRpt002RequestUrl = "";

const requestParam = zProjectReportDetailRequestGet;

const requestQuery = z.object({});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    projectReport: zProjectReportDetailResponse,
  }),
};

const responseErrorMap = {};

const apiRpt002 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiRpt002RequestParam = z.infer<typeof apiRpt002.requestParam>;
type ApiRpt002RequestQuery = z.infer<typeof apiRpt002.requestQuery>;
type ApiRpt002RequestBody = z.infer<typeof apiRpt002.requestBody>;
type ApiRpt002ResponseOk = z.infer<(typeof apiRpt002.responseBodyMap)[200]>;

export default apiRpt002;

export type {
  ApiRpt002RequestParam,
  ApiRpt002RequestQuery,
  ApiRpt002RequestBody,
  ApiRpt002ResponseOk,
};

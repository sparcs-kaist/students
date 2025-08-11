import { HttpStatusCode } from "axios";
import { z } from "zod";

import {
  zProjectReportSubmitRequestUpdate,
  zProjectReportSubmitResponse,
} from "../type/project-report.type";

/**
 * @version v0.1
 * @description
 */

const url = () => ``;
const method = "";
export const ApiRpt007RequestUrl = "";

const requestParam = z.object({});

const requestQuery = z.object({});

const requestBody = z.object({
  projectReportRevision: zProjectReportSubmitRequestUpdate,
});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    projectReportRevision: zProjectReportSubmitResponse,
  }),
};

const responseErrorMap = {};

const apiRpt007 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiRpt007RequestParam = z.infer<typeof apiRpt007.requestParam>;
type ApiRpt007RequestQuery = z.infer<typeof apiRpt007.requestQuery>;
type ApiRpt007RequestBody = z.infer<typeof apiRpt007.requestBody>;
type ApiRpt007ResponseOk = z.infer<(typeof apiRpt007.responseBodyMap)[200]>;

export default apiRpt007;

export type {
  ApiRpt007RequestParam,
  ApiRpt007RequestQuery,
  ApiRpt007RequestBody,
  ApiRpt007ResponseOk,
};

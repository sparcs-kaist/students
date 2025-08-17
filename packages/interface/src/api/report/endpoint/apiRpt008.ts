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
export const ApiRpt008RequestUrl = "";

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

const apiRpt008 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiRpt008RequestParam = z.infer<typeof apiRpt008.requestParam>;
type ApiRpt008RequestQuery = z.infer<typeof apiRpt008.requestQuery>;
type ApiRpt008RequestBody = z.infer<typeof apiRpt008.requestBody>;
type ApiRpt008ResponseOk = z.infer<(typeof apiRpt008.responseBodyMap)[200]>;

export default apiRpt008;

export type {
  ApiRpt008RequestParam,
  ApiRpt008RequestQuery,
  ApiRpt008RequestBody,
  ApiRpt008ResponseOk,
};

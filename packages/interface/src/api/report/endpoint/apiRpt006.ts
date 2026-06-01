import { HttpStatusCode } from "axios";
import { z } from "zod";

import {
  zProjectReportRevisionRequestCreate,
  zProjectReportRevisionResponse,
} from "../type/project-report.type";

/**
 * @version v0.1
 * @description
 */

const url = () => ``;
const method = "";
export const ApiRpt006RequestUrl = "";

const requestParam = z.object({});

const requestQuery = z.object({});

const requestBody = z.object({
  projectReportRevision: zProjectReportRevisionRequestCreate,
});

const responseBodyMap = {
  [HttpStatusCode.Created]: z.object({
    projectReportRevision: zProjectReportRevisionResponse,
  }),
};

const responseErrorMap = {};

const apiRpt006 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiRpt006RequestParam = z.infer<typeof apiRpt006.requestParam>;
type ApiRpt006RequestQuery = z.infer<typeof apiRpt006.requestQuery>;
type ApiRpt006RequestBody = z.infer<typeof apiRpt006.requestBody>;
type ApiRpt006ResponseCreated = z.infer<
  (typeof apiRpt006.responseBodyMap)[201]
>;

export default apiRpt006;

export type {
  ApiRpt006RequestParam,
  ApiRpt006RequestQuery,
  ApiRpt006RequestBody,
  ApiRpt006ResponseCreated,
};

import { HttpStatusCode } from "axios";
import { z } from "zod";

import {
  zProjectReportListRequestGet,
  zProjectReportListResponse,
} from "../type/project-report.type";

/**
 * @version v0.1
 * @description 특정 기구의 특정 반기의 사업보고서의 목록을 조회합니다. 
  가장 최신의 승인된 사업 계획서만 확인하게 됩니다.
 */

const url = () => ``;
const method = "GET";
export const ApiRpt001RequestUrl = "";

const requestParam = z.object({});
// TODO: 따로 스키마를 감쌀지 그대로 할 지 결정 (requset: zProject..로 할 지 그냥 아래처럼 할 지)
const requestQuery = z.object({
  projectReportInfo: zProjectReportListRequestGet,
});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    projectReportList: zProjectReportListResponse,
  }),
};

const responseErrorMap = {};

const apiRpt001 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiRpt001RequestParam = z.infer<typeof apiRpt001.requestParam>;
type ApiRpt001RequestQuery = z.infer<typeof apiRpt001.requestQuery>;
type ApiRpt001RequestBody = z.infer<typeof apiRpt001.requestBody>;
type ApiRpt001ResponseOk = z.infer<(typeof apiRpt001.responseBodyMap)[200]>;

export default apiRpt001;

export type {
  ApiRpt001RequestParam,
  ApiRpt001RequestQuery,
  ApiRpt001RequestBody,
  ApiRpt001ResponseOk,
};

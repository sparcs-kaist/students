import { HttpStatusCode } from "axios";
import { z } from "zod";

import { zId } from "@sparcs-students/interface/common/type/ids";

/**
 * @version v0.1
 * @description 결산안 수입 제출본 날짜 목록을 조회합니다.
 */

const url = () => `student/reports/budget-reports/income/getDateList`;
const method = "GET";
export const ApiBudRpt014RequestUrl =
  "student/reports/budget-reports/income/getDateList";

const requestParam = z.object({});

const requestQuery = z.object({
  organization: zId,
  semester: zId,
});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.array(z.string().datetime()),
};

const responseErrorMap = {};

const apiBudRpt014 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiBudRpt014RequestParam = z.infer<typeof apiBudRpt014.requestParam>;
type ApiBudRpt014RequestQuery = z.infer<typeof apiBudRpt014.requestQuery>;
type ApiBudRpt014RequestBody = z.infer<typeof apiBudRpt014.requestBody>;
type ApiBudRpt014ResponseOk = z.infer<
  (typeof apiBudRpt014.responseBodyMap)[200]
>;

export default apiBudRpt014;

export type {
  ApiBudRpt014RequestParam,
  ApiBudRpt014RequestQuery,
  ApiBudRpt014RequestBody,
  ApiBudRpt014ResponseOk,
};

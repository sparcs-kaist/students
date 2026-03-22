import { HttpStatusCode } from "axios";
import { z } from "zod";

import { zId } from "@sparcs-students/interface/common/type/ids";

/**
 * @version v0.1
 * @description 결산안 지출 제출본 날짜 목록을 조회합니다.
 */

const url = () => `student/reports/budget-reports/expense/getDateList`;
const method = "GET";
export const ApiBudRpt015RequestUrl =
  "student/reports/budget-reports/expense/getDateList";

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

const apiBudRpt015 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiBudRpt015RequestParam = z.infer<typeof apiBudRpt015.requestParam>;
type ApiBudRpt015RequestQuery = z.infer<typeof apiBudRpt015.requestQuery>;
type ApiBudRpt015RequestBody = z.infer<typeof apiBudRpt015.requestBody>;
type ApiBudRpt015ResponseOk = z.infer<
  (typeof apiBudRpt015.responseBodyMap)[200]
>;

export default apiBudRpt015;

export type {
  ApiBudRpt015RequestParam,
  ApiBudRpt015RequestQuery,
  ApiBudRpt015RequestBody,
  ApiBudRpt015ResponseOk,
};

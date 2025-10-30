import { HttpStatusCode } from "axios";
import { z } from "zod";

import { zId } from "@sparcs-students/interface/common/type/ids";

/**
 * @version v0.1
 * @description 예산안 수입 제출본 날짜 목록을 조회합니다.
 */

const url = () => `student/proposals/budget-proposals/income/getDateList`;
const method = "GET";
export const ApiBudPrp014RequestUrl =
  "student/proposals/budget-proposals/income/getDateList";

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

const apiBudPrp014 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiBudPrp014RequestParam = z.infer<typeof apiBudPrp014.requestParam>;
type ApiBudPrp014RequestQuery = z.infer<typeof apiBudPrp014.requestQuery>;
type ApiBudPrp014RequestBody = z.infer<typeof apiBudPrp014.requestBody>;
type ApiBudPrp014ResponseOk = z.infer<
  (typeof apiBudPrp014.responseBodyMap)[200]
>;

export default apiBudPrp014;

export type {
  ApiBudPrp014RequestParam,
  ApiBudPrp014RequestQuery,
  ApiBudPrp014RequestBody,
  ApiBudPrp014ResponseOk,
};

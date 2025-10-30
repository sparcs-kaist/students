import { HttpStatusCode } from "axios";
import { z } from "zod";

import { zId } from "@sparcs-students/interface/common/type/ids";

/**
 * @version v0.1
 * @description 예산안 지출 제출본 날짜 목록을 조회합니다.
 */

const url = () => `student/proposals/budget-proposals/expense/getDateList`;
const method = "GET";
export const ApiBudPrp015RequestUrl =
  "student/proposals/budget-proposals/expense/getDateList";

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

const apiBudPrp015 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiBudPrp015RequestParam = z.infer<typeof apiBudPrp015.requestParam>;
type ApiBudPrp015RequestQuery = z.infer<typeof apiBudPrp015.requestQuery>;
type ApiBudPrp015RequestBody = z.infer<typeof apiBudPrp015.requestBody>;
type ApiBudPrp015ResponseOk = z.infer<
  (typeof apiBudPrp015.responseBodyMap)[200]
>;

export default apiBudPrp015;

export type {
  ApiBudPrp015RequestParam,
  ApiBudPrp015RequestQuery,
  ApiBudPrp015RequestBody,
  ApiBudPrp015ResponseOk,
};

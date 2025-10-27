import { z } from "zod";

import { zId } from "@sparcs-students/interface/common/type/ids";

/**
 * @version v0.1
 * @description 예산안 수입을 삭제합니다.
 */

const url = () => `/manager/proposals/budget-proposals/income/delete`;
const method = "DELETE";
export const ApiBudPrp006RequestUrl =
  "/manager/proposals/budget-proposals/income/delete";

const requestParam = z.object({});

const requestQuery = z.object({
  organization: zId,
  semester: zId,
});

const requestBody = z.object({});

const responseBodyMap = {};

const responseErrorMap = {};

const apiBudPrp006 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiBudPrp006RequestParam = z.infer<typeof apiBudPrp006.requestParam>;
type ApiBudPrp006RequestQuery = z.infer<typeof apiBudPrp006.requestQuery>;
type ApiBudPrp006RequestBody = z.infer<typeof apiBudPrp006.requestBody>;

export default apiBudPrp006;

export type {
  ApiBudPrp006RequestParam,
  ApiBudPrp006RequestQuery,
  ApiBudPrp006RequestBody,
};

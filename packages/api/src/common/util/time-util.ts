import { toZonedTime, fromZonedTime } from "date-fns-tz";

const DB_TIMEZONE = "Asia/Seoul";

/**
 * @param obj
 * @description 주어진 객체의 Date 프로퍼티들을 모두 DB에 넣을 수 있도록 KST 기준으로 변환
 * @description 중첩 객체도 가능
 * @warning 다만, plain object로 반환하기에 차후 method나 prototype chain을 사용할 수 없음
 * @example
 * ```ts
 * // IN to
 * const obj = makeObjectPropsToDBTimezone(this);
 * return CHANGE_TO_SCHEMA(obj);
 *
 * // IN query (select, count in base repository)
 * const where = makeObjectPropsToDBTimezone(whereClause);
 * ```
 */
export const makeObjectPropsToDBTimezone = <T extends object | unknown>(
  obj: T,
): T => {
  if (!obj) return obj;
  if (typeof obj !== "object") return obj;
  if (Array.isArray(obj))
    return obj.map(item => makeObjectPropsToDBTimezone(item)) as T;
  if (obj instanceof Date) {
    return toZonedTime(obj, DB_TIMEZONE) as T;
  }

  return Object.entries(obj).reduce((acc, [key, value]) => {
    // eslint-disable-next-line no-param-reassign
    acc[key] = makeObjectPropsToDBTimezone(value);
    return acc;
  }, {} as T);
};

/**
 * @param obj
 * @description 주어진 객체의 Date 프로퍼티들을 모두 DB에서 가져온 값을 UTC 기준으로 변환
 * @description FromDB에서 사용
 * @example
 * ```ts
 * // IN from
 * return new Model(makeObjectPropsFromDBTimezone(dbResult));
 * ```
 */
export const makeObjectPropsFromDBTimezone = <T extends object | unknown>(
  obj: T,
): T => {
  if (!obj) return obj;
  if (typeof obj !== "object") return obj;
  if (Array.isArray(obj))
    return obj.map(item => makeObjectPropsFromDBTimezone(item)) as T;
  if (obj instanceof Date) {
    return fromZonedTime(obj, DB_TIMEZONE) as T;
  }

  return Object.entries(obj).reduce((acc, [key, value]) => {
    // eslint-disable-next-line no-param-reassign
    acc[key] = makeObjectPropsFromDBTimezone(value);
    return acc;
  }, {} as T);
};

/**
 * @description: deletedAt:new Date() 를 시긴대 조정해서 반환
 * @description: delete 쿼리에서 사용
 */
export const getDeletedAtObject = (): { deletedAt: Date } =>
  makeObjectPropsToDBTimezone({ deletedAt: new Date() });

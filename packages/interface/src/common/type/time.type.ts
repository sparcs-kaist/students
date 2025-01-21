import { z } from "zod";

const zWeekTime = z.custom<number>(val => {
  const time = z
    .number()
    .int()
    .min(0)
    .max(24 * 7);
  return typeof time.parse(val) === "number";
});

type WeekTime = z.infer<typeof zWeekTime>;

// zod의 커스텀 타입 Validation test 입니다.
// 168까지 정상적으로 validation한 이후 validationerror를 throw합니다.
const testZWeekTimeValidation = () => {
  for (let i = 0; ; i += 1) {
    console.log(zWeekTime.parse(i));
  }
};

export { zWeekTime, testZWeekTimeValidation };
export type { WeekTime };

// DateOnly: "YYYY-MM-DD" 형식
const dateOnlyRegex = /^\d{4}-\d{2}-\d{2}$/;
export const zDateOnly = z.custom<string>(val =>
  typeof val === "string" ? dateOnlyRegex.test(val) : false,
);
export type DateOnly = z.infer<typeof zDateOnly>;

// DateTime: ISO 8601 형식 "YYYY-MM-DDTHH:mm:ssZ"
const dateTimeRegex =
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(Z|([+-]\d{2}:\d{2}))?$/;
export const zDateTime = z.custom<string>(val =>
  typeof val === "string" ? dateTimeRegex.test(val) : false,
);
export type DateTime = z.infer<typeof zDateTime>;

// Timestamp: DateTime 값과 UTC 또는 KST 구분
export const zTimestamp = z.object({
  value: zDateTime,
  timeZone: z.enum(["UTC", "KST"]),
});
export type Timestamp = z.infer<typeof zTimestamp>;

export const zDuration = z.object({
  start: zDateOnly,
  end: zDateOnly.nullable(),
});

export type Duration = z.infer<typeof zDuration>;

import path from "path";
import { createLogger, format, transports } from "winston";
import DailyRotateFileTransport from "winston-daily-rotate-file";

import { env } from "@sparcs-students/api/env";

// logger에서 사용할 포맷들을 정의합니다.
const baseFormat = format.combine(
  format.timestamp({ format: "YYYY-MM-DD HH:mm:ss(UTCZ)" }),
  format.errors({ stack: true }),
  format.splat(),
  format.json(),
);
const finalFormat = format.printf(
  ({ level, message, timestamp, stack }) =>
    `${timestamp} [${level}]: ${message} ${
      level === "error" && stack !== undefined ? stack : ""
    }`,
);

// 파일 출력 시 사용될 포맷. 색 관련 특수문자가 파일에 쓰여지는 것을 방지하기 위해 색상이 표시되지 않습니다.
const uncolorizedFormat = format.combine(
  baseFormat,
  format.uncolorize(),
  finalFormat,
);

// 콘솔 출력 시 사용될 포맷. 색상이 표시됩니다.
const colorizedFormat = format.combine(
  baseFormat,
  format.colorize({ all: true }),
  finalFormat,
);

const { NODE_ENV } = env;
// 로그 파일명에 포함되는 시각
const datePattern = "YYYY-MM-DD-HH";
// 로그 파일당 최대 크기(=5MB).
const maxSize = 5 * 1024 * 1024;

/**
 * console.log()와 console.error() 대신 사용되는 winston Logger 객체입니다.
 *
 * - "production" 환경: 모든 로그는 파일 시스템에 저장되고, 오류 메시지는 콘솔로도 출력됩니다.
 * - "development" & "test" 환경: 모든 로그는 콘솔에 출력됩니다.
 *
 * @method info(message: string, callback: winston.LogCallback) - 일반적인 정보(API 접근 등) 기록을 위해 사용합니다.
 * @method error(message: string, callback: winston.LogCallback)  - 오류 메시지를 기록하기 위해 사용합니다.
 */
// eslint-disable-next-line import/no-mutable-exports
let logger;
if (NODE_ENV === "production") {
  logger = createLogger({
    level: "info",
    format: uncolorizedFormat,
    defaultMeta: { service: "students" },
    transports: [
      new DailyRotateFileTransport({
        level: "info",
        filename: path.resolve("logs/%DATE%-combined.log"),
        datePattern,
        maxSize,
      }),
      new DailyRotateFileTransport({
        level: "error",
        filename: path.resolve("logs/%DATE%-error.log"),
        datePattern,
        maxSize,
      }),
      new transports.Console({ level: "error" }),
    ],
    exceptionHandlers: [
      new DailyRotateFileTransport({
        filename: path.resolve("logs/%DATE%-unhandled.log"),
        datePattern,
        maxSize,
      }),
      new transports.Console(),
    ],
  });
} else if (NODE_ENV === "development") {
  logger = createLogger({
    level: "debug",
    format: uncolorizedFormat,
    defaultMeta: { service: "students" },
    transports: [
      new DailyRotateFileTransport({
        level: "info",
        filename: path.resolve("logs/%DATE%-combined.log"),
        datePattern,
        maxSize,
      }),
      new DailyRotateFileTransport({
        level: "error",
        filename: path.resolve("logs/%DATE%-error.log"),
        datePattern,
        maxSize,
      }),
      new transports.Console({ level: "error" }),
      new transports.Console({
        level: "debug",
        format: colorizedFormat,
      }),
    ],
    exceptionHandlers: [
      new DailyRotateFileTransport({
        filename: path.resolve("logs/%DATE%-unhandled.log"),
        datePattern,
        maxSize,
      }),
      new transports.Console({
        format: colorizedFormat,
      }),
    ],
  });
} else {
  // test or other environments
  logger = createLogger({
    level: "debug",
    format: colorizedFormat,
    defaultMeta: { service: "students" },
    transports: [new transports.Console()],
    exceptionHandlers: [new transports.Console()],
  });
}
export default logger;

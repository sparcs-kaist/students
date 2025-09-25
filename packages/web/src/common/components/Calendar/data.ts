// packages\web\src\common\components\Calendar\data.ts

import { parseExcelDate } from "./utils";
import { ProcessedEvent, EventPeriod } from "./types";

// 엑셀 데이터
const excelData: string[][] = [
  ["8.13", "8.13", "8월 2주차 중운위", "", ""],
  [
    "8.27",
    "8.27",
    "8월 4주차 중운위",
    "예산안 및 사업계획서 제출마감(자정)",
    "",
  ],
  ["8.28", "8.28", "선집행안건제출마감", "", ""],
  ["8.29", "8.29", "예산 1차 검토 의견", "", ""],
  [
    "8.31",
    "8.31",
    "8월 단위별 운영보고",
    "결산 및 사업보고서 제출마감(자정)",
    "특별기구 재심의",
  ],
  ["9.1", "9.1", "개강", "", ""],
  ["9.2", "9.2", "결산 1차 검토 의견", "", ""],
  ["9.3", "9.3", "1차 수정제출(자정)", "", ""],
  ["9.4", "9.4", "KAMF 전야제", "", ""],
  ["9.5", "9.6", "KAMF", "", ""],
  ["9.7", "9.7", "1차 사전 중운위", "2차 검토 의견", ""],
  ["9.8", "9.8", "안건제출마감", "2차 수정제출(자정)", ""],
  ["9.10", "9.10", "2차 사전 중운위(정기회)", "최종 검토 의견", ""],
  ["9.11", "9.11", "최종 검토 의견", "", ""],
  ["9.14", "9.14", "전문기구 운영보고", "", ""],
  ["9.15", "9.15", "최종 수정제출(자정)", "", ""],
  ["9.17", "9.17", "안건제출마감", "", ""],
  ["9.19", "9.20", "카포전", "", ""],
];

// 데이터 변환
export const processedEvents: ProcessedEvent[] = excelData
  .map(row => {
    const startDate = parseExcelDate(row[0]);
    const endDate = parseExcelDate(row[1]);
    if (!startDate || !endDate) return null;

    return {
      start: startDate,
      end: endDate,
      title1: row[2] || "",
      title2: row[3] || "",
      title3: row[4] || "",
    };
  })
  .filter((item): item is ProcessedEvent => item !== null);

export const getExistDates = (): Date[] =>
  processedEvents.flatMap(event => {
    const dates = [event.start];
    if (event.start.getTime() !== event.end.getTime()) {
      dates.push(event.end);
    }
    return dates;
  });

export const getEventPeriods = (): EventPeriod[] =>
  processedEvents.map(event => ({
    start: event.start,
    end: event.end,
  }));

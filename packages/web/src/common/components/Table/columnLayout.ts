import type { Column } from "@tanstack/react-table";

/**
 * 늘어나는 컬럼(size: 0)의 최소 폭.
 * 폭이 모자라면 표 영역(TableWrapper)만 가로 스크롤된다.
 *
 * 기준: 본문 14px 한글 약 11px/자, 셀 좌우 패딩 40px, 내용 폭 1120px(1280px 화면).
 * - 고정 컬럼 합계가 1120px 이하인 표는 늘어나는 컬럼이 들어가도 1120px를 넘지 않게 정한다.
 * - 이미 1120px를 넘는 표는 내용 기준 값(NAME 등)을 쓴다.
 */
export const COLUMN_MIN_WIDTH = {
  /** 사업명·항목·단체명·소속 부서 등 이름 (한글 약 14자) */
  NAME: 200,
  /** NAME을 쓰면 1120px를 넘어 새로 스크롤이 생기는 표 (고정 컬럼 합계 963px) */
  NAME_COMPACT: 150,
  /** 직책 등 짧은 텍스트 */
  SHORT: 160,
  /** 금액 ("-₩1,020,000" + 패딩) */
  AMOUNT: 140,
  /** 헤더가 긴 금액 컬럼 ("기 편성 예산 총지출" 18px 헤더) */
  AMOUNT_WIDE: 220,
  /** 설명·비고 등 긴 글 */
  DESCRIPTION: 300,
} as const;

/** size: 0으로 선언한 컬럼은 남는 폭을 채우는(flex: 1) 컬럼이다. */
const isFlexColumn = <T>(column: Column<T, unknown>) =>
  column.columnDef.size === 0;

// getSize()는 minSize 이하로 내려가지 않아서 size: 0 컬럼이 고정 폭이 되므로 직접 0을 돌려준다.
export const getColumnWidth = <T>(column: Column<T, unknown>) =>
  isFlexColumn(column) ? 0 : column.getSize();

export const getColumnMinWidth = <T>(column: Column<T, unknown>) =>
  isFlexColumn(column) ? column.columnDef.minSize : undefined;

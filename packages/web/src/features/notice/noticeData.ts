export interface NoticeRow {
  id?: string;
  tag?: string;
  content: string;
  date?: Date;
  link?: string;
  detail?: string;
}

export const NOTICE_STORAGE_KEY = "sparcs-students-notices";

export const noticeExample: NoticeRow[] = [
  {
    tag: "총학",
    content: "2025년 가을학기 예결산안 매뉴얼",
    date: new Date("2025-08-20"),
    link: "https://drive.google.com/drive/folders/1-2TxRDA9kSo_3f3wMHAwyug6haGZxxrn?usp=sharing",
    detail:
      "2025년 가을학기 예결산안 매뉴얼입니다.\n\n- 제출 기간: 2025.08.20~2025.08.30\n- 담당 부서: 총학생회 재정팀\n- 관련 자료는 첨부 링크에서 확인할 수 있습니다.",
  },
  {
    tag: "총학",
    content: "2025년 가을학기 예결산안 양식",
    date: new Date("2025-08-18"),
    link: "https://drive.google.com/drive/folders/1-2TxRDA9kSo_3f3wMHAwyug6haGZxxrn?usp=sharing",
    detail:
      "2025년 가을학기 예결산안 양식입니다.\n\n- 양식 다운로드: 첨부 링크\n- 작성 방법: 세부 예산 항목을 기준으로 작성\n- 제출 전 확인사항: 각 항목별 증빙 자료 첨부 필수",
  },
  {
    tag: "감사원",
    content: "2025년 가을학기 예결산 제출 파일 양식",
    date: new Date("2025-08-18"),
    link: "https://linktr.ee/kaistbai",
    detail:
      "2025년 가을학기 예결산 제출 파일 양식을 공유드립니다.\n\n- 제출기한: 2025.08.25 23:59\n- 파일 형식: .xlsx, .pdf\n- 문의: 총학생회 감사원",
  },
];

export const normalizeNoticeList = (notices: NoticeRow[]): NoticeRow[] =>
  notices.map(notice => ({
    ...notice,
    detail: notice.detail ?? "",
    date: notice.date ? new Date(notice.date) : undefined,
  }));

export const getStoredNoticeList = (): NoticeRow[] => {
  if (typeof window === "undefined") {
    return normalizeNoticeList(
      Array.from({ length: 100 }, () => [...noticeExample])
        .flat()
        .sort(
          (a, b) => (b.date as Date).getTime() - (a.date as Date).getTime(),
        ),
    );
  }

  const stored = window.localStorage.getItem(NOTICE_STORAGE_KEY);

  if (!stored) {
    const defaultList = Array.from({ length: 100 }, () => [...noticeExample])
      .flat()
      .sort((a, b) => (b.date as Date).getTime() - (a.date as Date).getTime());
    const normalized = normalizeNoticeList(defaultList);
    window.localStorage.setItem(NOTICE_STORAGE_KEY, JSON.stringify(normalized));
    return normalized;
  }

  try {
    const parsed = JSON.parse(stored) as NoticeRow[];
    if (Array.isArray(parsed) && parsed.length > 0) {
      return normalizeNoticeList(parsed);
    }
  } catch {
    // Ignore invalid localStorage data and fall back to default list.
  }

  const fallbackList = Array.from({ length: 100 }, () => [...noticeExample])
    .flat()
    .sort((a, b) => (b.date as Date).getTime() - (a.date as Date).getTime());

  return normalizeNoticeList(fallbackList);
};

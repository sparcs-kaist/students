// packages\web\src\common\components\Calendar\utils.ts

export const parseExcelDate = (dateStr: string): Date | null => {
  if (!dateStr || dateStr === "") return null;

  const parts = dateStr.split(".");
  if (parts.length === 2) {
    const month = parseInt(parts[0]);
    const day = parseInt(parts[1]);
    return new Date(2025, month - 1, day);
  }
  return null;
};

export const formatFullDate = (date: Date): string =>
  `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;

export const formatShortDate = (date: Date): string =>
  `${date.getMonth() + 1}/${date.getDate()}`;

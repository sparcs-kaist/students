import { format } from "date-fns";
import { ko } from "date-fns/locale";

const formatSimpleDate = (date: Date) =>
  format(date, "M월 d일", { locale: ko });

export { formatSimpleDate };

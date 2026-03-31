import en from "./i18n/messages/en.json";
import ko from "./i18n/messages/ko.json";

const MESSAGES_BY_LOCALE: Record<string, Record<string, string>> = {
  en,
  ko,
};

export default async function messages(
  locale: string,
): Promise<Record<string, string>> {
  return MESSAGES_BY_LOCALE[locale] ?? en;
}

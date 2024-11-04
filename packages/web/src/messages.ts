export default async function messages(
  locale: string,
): Promise<Record<string, string>> {
  try {
    const message = (await import(`./locales/${locale}.json`)).default;
    return message;
  } catch (error) {
    console.error(`Could not load messages for locale "${locale}"`, error);
    return {};
  }
}

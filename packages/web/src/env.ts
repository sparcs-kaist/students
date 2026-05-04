// TODO: Add Zod
import { loadEnvFilesFromMonorepoRoot } from "@sparcs-students/root/env/dotenv-options";

loadEnvFilesFromMonorepoRoot();

/** Env values are strings; `"0"` is truthy in JS — only explicit positives mean mock on */
function isExplicitTruthyEnv(value: string | undefined): boolean {
  if (value == null || value === "") return false;
  const v = value.trim().toLowerCase();
  return v === "1" || v === "true" || v === "yes" || v === "on";
}

const env = {
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_API_MOCK_MODE: isExplicitTruthyEnv(
    process.env.NEXT_PUBLIC_API_MOCK_MODE,
  ),
};
export { env };

import path from "path";
import dotenv from "dotenv";

const envDir = path.join(process.cwd(), "../../", "env");
const nodeEnv = process.env.NODE_ENV || "local";

/**
 * 1. `.env` — shared defaults
 * 2. `.env.<NODE_ENV>` — e.g. `.env.development` for `next dev`
 * 3. `.env.local` — local overrides
 */
export function loadEnvFilesFromMonorepoRoot(): void {
  dotenv.config({ path: path.join(envDir, ".env") });
  dotenv.config({
    path: path.join(envDir, `.env.${nodeEnv}`),
    override: true,
  });
  dotenv.config({ path: path.join(envDir, ".env.local"), override: true });
}

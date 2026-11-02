import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants.js";
import createNextIntlPlugin from "next-intl/plugin";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const envDir = path.join(dirname, "../../env");
const nodeEnv = process.env.NODE_ENV || "local";

const originalNodeEnv = process.env.NODE_ENV;

dotenv.config({ path: path.join(envDir, ".env") });
dotenv.config({
  path: path.join(envDir, `.env.${nodeEnv}`),
  override: true,
});
dotenv.config({ path: path.join(envDir, ".env.local"), override: true });

if (originalNodeEnv) {
  process.env.NODE_ENV = originalNodeEnv;
}

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  transpilePackages: [],
};

export default phase =>
  withNextIntl({
    ...nextConfig,
    // Keep builds from replacing files used by a running development server.
    distDir: phase === PHASE_DEVELOPMENT_SERVER ? ".next-dev" : ".next",
  });

import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
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

export default withNextIntl(nextConfig);

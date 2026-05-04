import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import createNextIntlPlugin from "next-intl/plugin";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envDir = path.join(__dirname, "../../env");
const nodeEnv = process.env.NODE_ENV || "local";
dotenv.config({ path: path.join(envDir, ".env") });
dotenv.config({
  path: path.join(envDir, `.env.${nodeEnv}`),
  override: true,
});
dotenv.config({ path: path.join(envDir, ".env.local"), override: true });

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
};

export default withNextIntl(nextConfig);

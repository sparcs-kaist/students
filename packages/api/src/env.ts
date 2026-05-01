import { z } from "zod";
import { loadEnvFilesFromMonorepoRoot } from "@sparcs-students/root/env/dotenv-options";

loadEnvFilesFromMonorepoRoot();
const schema = z.object({
  NODE_ENV: z.enum(["local", "development", "production", "test", "dev"]),
  SERVER_PORT: z.coerce.number(),
  SECRET_KEY: z.string(),
  DATABASE_URL: z.string(),
});

const env = schema.parse(process.env);
// console.log(`NODE_ENV environment: ${process.env.NODE_ENV}`);

export { env };

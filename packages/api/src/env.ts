import { z } from "zod";
import dotenv from "dotenv";
import { dotEnvOptions } from "@sparcs-students/root/env/dotenv-options";

dotenv.config(dotEnvOptions);
const schema = z.object({
  NODE_ENV: z.enum(["development", "production", "test", "dev"]),
  SERVER_PORT: z.coerce.number(),
  SECRET_KEY: z.string(),
  DATABASE_URL: z.string(),
});

const env = schema.parse(process.env);
// console.log(`NODE_ENV environment: ${process.env.NODE_ENV}`);

export { env };

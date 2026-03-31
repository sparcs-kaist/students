// TODO: Add Zod
import dotenv from "dotenv";
import { dotEnvOptions } from "@sparcs-students/root/env/dotenv-options";

dotenv.config(dotEnvOptions);

const env = {
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_API_MOCK_MODE: process.env.NEXT_PUBLIC_API_MOCK_MODE,
};
export { env };

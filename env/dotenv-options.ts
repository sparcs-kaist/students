import path from "path";

const env = process.env.NODE_ENV || "local";
const envFilePath = path.join(process.cwd(), `env/.env.${env}`);
const dotEnvOptions = {
  path: envFilePath,
};

export { dotEnvOptions };

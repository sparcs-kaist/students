import { DocumentBuilder } from "@nestjs/swagger";

const getPortConfig = () => ({
  server: process.env.SERVER_PORT,
  client: process.env.CLIENT_PORT,
  database: process.env.DATABASE_PORT,
});

const getCorsConfig = () => {
  const { NODE_ENV } = process.env;
  if (NODE_ENV === "prod") {
    return {
      origin: ["https://students.kaist.ac.kr", "https://students.sparcs.org"],
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true,
      preflightContinue: false,
      optionsSuccessStatus: 204,
    };
  }
  if (NODE_ENV === "dev") {
    return {
      origin: [
        "https://students.dev.sparcs.org",
        `http://localhost:${getPortConfig().client}`,
      ],
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true,
      preflightContinue: false,
      optionsSuccessStatus: 204,
    };
  }
  return {
    origin: `http://localhost:${getPortConfig().client}`,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
  };
};

const getAWSConfig = () => ({});

const getJwtConfig = () => ({
  secret: process.env.JWT_SECRET,
  signOptions: {
    expiresIn: process.env.EXPIRES_IN,
    refreshExpiresIn: process.env.REFRESH_EXPIRES_IN,
  },
});

const getSsoConfig = () => ({
  ssoIsBeta: process.env.SSO_IS_BETA !== "false",
  ssoClientId: process.env.SSO_CLIENT_ID,
  ssoSecretKey: process.env.SSO_SECRET_KEY,
});
const getVersion = () => String(process.env.npm_package_version);

const getSwaggerConfig = () =>
  new DocumentBuilder()
    .setTitle("Students-server")
    .setDescription("The Students-server API description")
    .setVersion("1.0")
    .build();

export default () => ({
  awsconfig: () => getAWSConfig(),
  getPortConfig: () => getPortConfig(),
  getJwtConfig: () => getJwtConfig(),
  getSsoConfig: () => getSsoConfig(),
  getCorsConfig: () => getCorsConfig(),
  getVersion: () => getVersion(),
  getSwaggerConfig: () => getSwaggerConfig(),
});

import logger from "loglevel";

const initialize = () => {
  switch (process.env.NEXT_PUBLIC_ENVIRONMENT) {
    case "mock":
    case "swagger":
    case "stage":
    case "dev":
      return logger.setLevel(logger.levels.TRACE);
    case "prod":
    default:
      return logger.setLevel(logger.levels.SILENT);
  }
};

initialize();

export default logger;

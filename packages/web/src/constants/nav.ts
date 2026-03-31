import type { Paths } from "./paths";

const headerPaths: (keyof Paths)[] = [
  "STUDENTS",
  "NOTICE",
  "COMMITTEE",
  "DOCUMENTS",
  "ACTIVITY_CERTIFICATE",
  "PETITION",
  "ORGANIZATION_MANAGE",
  "UAPRESIDENT",
];
const footerPaths: (keyof Paths)[] = ["MADE_BY", "LICENSE", "TERMS_OF_SERVICE"];

const navPaths = {
  header: headerPaths,
  footer: footerPaths,
};

export default navPaths;

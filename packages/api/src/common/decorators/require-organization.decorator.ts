import { SetMetadata } from "@nestjs/common";
import { OrganizationTypeEnum } from "@sparcs-students/interface/common/enum/organization.enum";

export const REQUIRE_ORGANIZATIONS_KEY = "requireOrganizations";

export const RequireOrganizations = (
  ...organizationTypeEnums: OrganizationTypeEnum[]
) => SetMetadata(REQUIRE_ORGANIZATIONS_KEY, organizationTypeEnums);

export const UaOrgOnly = () =>
  RequireOrganizations(OrganizationTypeEnum.UAPresidents);

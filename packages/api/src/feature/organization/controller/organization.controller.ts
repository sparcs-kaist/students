import { Controller } from "@nestjs/common";

import { OrganizationService } from "../service/organization.service";

@Controller()
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}
}

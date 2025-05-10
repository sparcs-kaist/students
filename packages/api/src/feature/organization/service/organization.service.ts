import { Injectable, Inject } from "@nestjs/common";

import { MySql2Database } from "drizzle-orm/mysql2";
import { DrizzleAsyncProvider } from "src/drizzle/drizzle.provider";

import { SemesterPublicService } from "@sparcs-students/api/feature/semester/service/semester.public.service";

import { OrganizationRepository } from "../repository/organization.repository";

@Injectable()
export class OrganizationService {
  constructor(
    @Inject(DrizzleAsyncProvider) private readonly db: MySql2Database,
    private readonly organizationRepository: OrganizationRepository,
    private readonly semesterPublicService: SemesterPublicService,
  ) {}
}

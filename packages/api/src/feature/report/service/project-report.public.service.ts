/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable, NotFoundException } from "@nestjs/common";

import {
  ApiRpt001RequestQuery,
  ApiRpt001ResponseOk,
  ApiRpt002RequestParam,
  ApiRpt002ResponseOk,
} from "@sparcs-students/interface/api/report/index";
import { OrganizationRepository } from "@sparcs-students/api/feature/organization/repository/organization.repository";
import { OrganizationManagerRepository } from "@sparcs-students/api/feature/organization/repository/organization.manager.repository";
import { BudgetProposalExpenseRevisionRepository } from "@sparcs-students/api/feature/proposal/repository/budget-proposal-expense-revision.repository";
import { BudgetReportExpenseRevisionRepository } from "../repository/budget-report-expense-revision.repository";
import { ProjectReportRepository } from "../repository/project-report.repository";
import { ProjectReportRevisionRepository } from "../repository/project-report-revision.repository";

@Injectable()
export class ProjectReportPublicService {
  constructor(
    private readonly projectReportRepository: ProjectReportRepository,
    private readonly organizationRepository: OrganizationRepository,
    private readonly organizationManagerRepository: OrganizationManagerRepository,
    private readonly projectReportRevisionRepository: ProjectReportRevisionRepository,
    private readonly budgetReportExpenseReivisionRepository: BudgetReportExpenseRevisionRepository,
    private readonly budgetProposalExpenseRepositoryRevision: BudgetProposalExpenseRevisionRepository,
    // private readonly semesterPublicService: SemesterPublicService,
  ) {}

  async getProjectReportList(
    query: ApiRpt001RequestQuery,
  ): Promise<ApiRpt001ResponseOk> {
    const [projectReports, organization, manager] = await Promise.all([
      this.projectReportRepository.find({
        organizationId: query.projectReportInfo.organization.id,
        semesterId: query.projectReportInfo.semester.id,
      } as any),
      this.organizationRepository.find({
        id: query.projectReportInfo.organization.id,
      } as any),
      this.organizationManagerRepository.find({
        organizationId: query.projectReportInfo.organization.id,
      } as any),
    ]);
    const reportIds = projectReports.map(report => report.id);
    const revisions = await this.projectReportRevisionRepository.find({
      projectReportId: reportIds,
    } as any);
    const projectReportInfoMap = new Map<number, any>();
    revisions.forEach(revision => {
      const existing = projectReportInfoMap.get(revision.projectReport.id);
      if (
        !existing ||
        (existing && existing.submittedAt < revision.submittedAt)
      ) {
        projectReportInfoMap.set(revision.projectReport.id, {
          projectName: revision.name,
          duration: revision.duration,
          submittedAt: revision.submittedAt,
        });
      }
    });
    const projectReportInfos = Array.from(
      projectReportInfoMap,
      ([key, value]) => ({
        projectReport: { id: key },
        projectName: value.projectName,
        duration: value.duration,
        acceptedStatus: "", // TODO
      }),
    );
    const projectReportList = {
      organization: query.projectReportInfo.organization,
      organizationName: organization[0].name,
      semester: query.projectReportInfo.semester,
      organizationPresident: { id: manager[0].id },
      organizationPresidentName: "", // manager[0].student // TODO: Students repository
      submitDate: new Date(""),
      projects: projectReportInfos,
    };
    return { projectReportList };
  }

  async getProjectReportDetail(
    param: ApiRpt002RequestParam,
  ): Promise<ApiRpt002ResponseOk> {
    const projectReports = await this.projectReportRepository.find({
      id: param.projectReportInfo.id,
    } as any);
    if (projectReports.length !== 1) {
      throw new NotFoundException();
    }
    const projectReportRevision = (
      await this.projectReportRevisionRepository.find({
        projectReportId: projectReports[0].id,
      } as any)
    ).reduce((a, b) => (a.submittedAt > b.submittedAt ? a : b));
    const budgetReports =
      await this.budgetReportExpenseReivisionRepository.find({
        projectReportId: projectReports[0].id,
      } as any);
    const budgetReportIds = budgetReports.map(budgetReport => budgetReport.id);
    const budgetProposals =
      await this.budgetProposalExpenseRepositoryRevision.find({
        previousBudgetReportExpenseId: budgetReportIds,
      } as any);
    const budgetReportsInfo = budgetProposals.map(proposal => {
      // proposal - report 가 항상 1:1인지 확인
      const report = budgetReports.find(
        budgetReport =>
          budgetReport.id === proposal.previousBudgetReportExpense.id,
      );
      return {
        id: proposal.previousBudgetReportExpense.id,
        name: proposal.name,
        budgetDomainEnum: proposal.budgetDomainEnum,
        budgetDivisionExpenseEnum: proposal.budgetDivisionExpenseEnum,
        budgetClassExpenseEnum: proposal.budgetClassExpenseEnum,
        proposalAmount: proposal.amount,
        reportAmount: report.amount,
        detail: proposal.detail,
        note: report.note,
      };
    });
    const projectReport = {
      projectProposal: { id: projectReports[0].projectProposal.id },
      projectReport: { id: projectReports[0].id },
      id: projectReportRevision.id,
      name: projectReportRevision.name,
      method: projectReportRevision.method,
      prepareDuration: projectReportRevision.prepareDuration,
      duration: projectReportRevision.duration,
      timelines: projectReportRevision.timelines,
      team: projectReportRevision.team,
      manager: projectReportRevision.manager,
      detail: projectReportRevision.detail,
      participation: projectReportRevision.participation,
      result: projectReportRevision.result,
      unmet: projectReportRevision.unmet,
      note: projectReportRevision.note,
      budgetExpenses: budgetReportsInfo,
    };
    return { projectReport };
  }
}

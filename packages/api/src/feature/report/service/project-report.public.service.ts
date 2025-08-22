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
import { BudgetReportExpenseRepository } from "../repository/budget-report-expense.repository";

@Injectable()
export class ProjectReportPublicService {
  constructor(
    private readonly projectReportRepository: ProjectReportRepository,
    private readonly organizationRepository: OrganizationRepository,
    private readonly organizationManagerRepository: OrganizationManagerRepository,
    private readonly projectReportRevisionRepository: ProjectReportRevisionRepository,
    private readonly budgetReportExpenseReivisionRepository: BudgetReportExpenseRevisionRepository,
    private readonly budgetReportExpenseRepository: BudgetReportExpenseRepository,
    private readonly budgetProposalExpenseRepositoryRevision: BudgetProposalExpenseRevisionRepository,
    // private readonly semesterPublicService: SemesterPublicService,
  ) {}

  async getProjectReportList(
    query: ApiRpt001RequestQuery,
  ): Promise<ApiRpt001ResponseOk> {
    const [projectReports, organization, manager] = await Promise.all([
      this.projectReportRepository.find({
        organizationId: query.organization,
        semesterId: query.semester,
      } as any),
      this.organizationRepository.find({
        id: query.organization,
      } as any),
      this.organizationManagerRepository.find({
        organizationId: query.organization,
      } as any),
    ]);
    if (organization.length === 0) {
      throw new NotFoundException("No Organization Exists");
    }
    if (manager.length === 0) {
      throw new NotFoundException("No Manager Exists");
    }
    if (projectReports.length === 0) {
      const projectReportList = {
        organization: { id: query.organization },
        organizationName: organization[0].name,
        semester: { id: query.semester },
        organizationPresident: { id: manager[0].id },
        organizationPresidentName: "", // manager[0].student // TODO: Students repository
        submitDate: new Date(""),
        projects: [],
      };
      return { projectReportList };
    }
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
      organization: { id: query.organization },
      organizationName: organization[0].name,
      semester: { id: query.semester },
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
      id: param.projectReport,
    } as any);
    if (projectReports.length === 0) {
      throw new NotFoundException("No Project Report Exists");
    }
    const projectReportRevisions =
      await this.projectReportRevisionRepository.find({
        projectReportId: projectReports[0].id,
      } as any);
    if (projectReportRevisions.length === 0) {
      throw new NotFoundException("No Project Report Revision Exists");
    }
    const projectReportRevision = projectReportRevisions.reduce((a, b) =>
      a.submittedAt > b.submittedAt ? a : b,
    );
    const projectReportInfo = {
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
    };
    const budgetReports = await this.budgetReportExpenseRepository.find({
      projectReportId: projectReports[0].id,
    } as any);
    const budgetExpenses =
      budgetReports.length === 0
        ? []
        : await (async () => {
            const budgetReportIds = budgetReports.map(
              budgetReport => budgetReport.id,
            );
            const budgetReportRevisions =
              await this.budgetReportExpenseReivisionRepository.find({
                budgetReportExpenseId: budgetReportIds,
              } as any);
            const budgetReportInfoMap = new Map();
            budgetReportRevisions.forEach(revision => {
              const existing = budgetReportInfoMap.get(
                revision.budgetReportExpense.id,
              );
              if (
                !existing ||
                (existing && existing.reportSubmittedAt < revision.submittedAt)
              ) {
                budgetReportInfoMap.set(revision.budgetReportExpense.id, {
                  reportSubmittedAt: revision.submittedAt,
                  proposalSubmittedAt: null,
                  name: null,
                  budgetDomainEnum: null,
                  budgetDivisionExpenseEnum: null,
                  budgetClassExpenseEnum: null,
                  proposalAmount: null,
                  reportAmount: revision.amount,
                  detail: null,
                  note: revision.note,
                });
              }
            });
            const budgetProposals =
              await this.budgetProposalExpenseRepositoryRevision.find({
                previousBudgetReportExpenseId: [...budgetReportInfoMap.keys()],
              } as any);
            budgetProposals.forEach(proposal => {
              const existing = budgetReportInfoMap.get(
                proposal.previousBudgetReportExpense.id,
              );
              if (
                !existing ||
                (existing &&
                  existing.proposalSubmittedAt < proposal.submittedAt)
              ) {
                budgetReportInfoMap.set(
                  proposal.previousBudgetReportExpense.id,
                  {
                    reportSubmittedAt: existing.reportSubmittedAt,
                    proposalSubmittedAt: proposal.submittedAt,
                    name: proposal.name,
                    budgetDomainEnum: proposal.budgetDomainEnum,
                    budgetDivisionExpenseEnum:
                      proposal.budgetDivisionExpenseEnum,
                    budgetClassExpenseEnum: proposal.budgetClassExpenseEnum,
                    proposalAmount: proposal.amount,
                    reportAmount: existing.reportAmount,
                    detail: proposal.detail,
                    note: existing.note,
                  },
                );
              }
            });
            return Array.from(budgetReportInfoMap, ([key, value]) => {
              // eslint-disable-next-line
              const { reportSubmittedAt, proposalSubmittedAt, ...info } = value;
              return { id: key.id, ...info };
            });
          })();
    const projectReport = {
      ...projectReportInfo,
      budgetExpenses,
    };
    return { projectReport };
  }
}

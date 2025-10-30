/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable, NotFoundException } from "@nestjs/common";
import {
  ApiRpt003RequestBody,
  ApiRpt003ResponseOk,
  ApiRpt004RequestBody,
  ApiRpt004ResponseOk,
  ApiRpt005RequestBody,
  ApiRpt005ResponseCreated,
  ApiRpt006RequestBody,
  ApiRpt006ResponseCreated,
  ApiRpt007RequestBody,
  ApiRpt007ResponseOk,
  ApiRpt008RequestBody,
  ApiRpt008ResponseOk,
  ApiRpt009RequestBody,
  ApiRpt009ResponseCreated,
  ApiRpt010RequestBody,
  ApiRpt010ResponseOk,
  ApiRpt011RequestBody,
  ApiRpt011ResponseNoContent,
} from "@sparcs-students/interface/api/report/index";

import { BudgetProposalExpenseRevisionRepository } from "@sparcs-students/api/feature/proposal/repository/budget-proposal-expense-revision.repository";
import { ProjectReportRepository } from "../repository/project-report.repository";
import { ProjectReportRevisionRepository } from "../repository/project-report-revision.repository";
import { BudgetReportExpenseRevisionRepository } from "../repository/budget-report-expense-revision.repository";
import { ProjectReportTimelineRepository } from "../repository/project-report-timeline.repository";
import { BudgetReportExpenseRepository } from "../repository/budget-report-expense.repository";

@Injectable()
export class ProjectReportService {
  constructor(
    private readonly projectReportRevisionRepository: ProjectReportRevisionRepository,
    private readonly projectReportTimelineRepository: ProjectReportTimelineRepository,
    private readonly projectReportRepository: ProjectReportRepository,
    private readonly budgetReportExpenseRepository: BudgetReportExpenseRepository,
    private readonly budgetReportExpenseRevisionRepository: BudgetReportExpenseRevisionRepository,
    private readonly budgetProposalExpenseRepositoryRevision: BudgetProposalExpenseRevisionRepository,
  ) {}

  async getProjectReportRevisionList(
    body: ApiRpt003RequestBody,
  ): Promise<ApiRpt003ResponseOk> {
    const projectReportRevisions = (
      await this.projectReportRevisionRepository.find({
        projectReportId: body.projectReport.id,
      } as any)
    ).map(revision => ({
      id: revision.id,
    }));
    return { projectReportRevisions };
  }

  async getProjectReportRevisionDetail(
    body: ApiRpt004RequestBody,
  ): Promise<ApiRpt004ResponseOk> {
    const projectReportRevisions =
      await this.projectReportRevisionRepository.find({
        id: body.projectReportRevision.id,
      } as any);
    if (projectReportRevisions.length === 0) {
      throw new NotFoundException("No Project Report Revision Exists");
    }
    const projectReportRevision = projectReportRevisions.reduce((a, b) =>
      a.submittedAt > b.submittedAt ? a : b,
    );
    const projectReports = await this.projectReportRepository.find({
      id: projectReportRevision.projectReport.id,
    } as any);
    if (projectReports.length === 0) {
      throw new NotFoundException("No Project Report Exists");
    }
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
      projectReportId: projectReportRevision.projectReport.id,
    } as any);
    const budgetExpenses =
      budgetReports.length === 0
        ? []
        : await (async () => {
            const budgetReportIds = budgetReports.map(
              budgetReport => budgetReport.id,
            );
            const budgetReportRevisions =
              await this.budgetReportExpenseRevisionRepository.find({
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
    return { projectReportRevision: projectReport };
  }

  async createProjectReport(
    body: ApiRpt005RequestBody,
  ): Promise<ApiRpt005ResponseCreated> {
    const projectReport = (
      await this.projectReportRepository.create(body.projectReport as any)
    )[0];
    return { projectReport: { id: projectReport.id } };
  }

  async createProjectReportRevision(
    body: ApiRpt006RequestBody,
  ): Promise<ApiRpt006ResponseCreated> {
    const projectReportRevision = (
      await this.projectReportRevisionRepository.create(
        body.projectReportRevision as any,
      )
    )[0];
    return { projectReportRevision: { id: projectReportRevision.id } };
  }

  async updateProjectReportRevision(
    body: ApiRpt007RequestBody,
  ): Promise<ApiRpt007ResponseOk> {
    const projectReportRevisions =
      await this.projectReportRevisionRepository.find({
        id: body.projectReportRevision.id,
      } as any);
    if (projectReportRevisions.length === 0) {
      throw new NotFoundException("No Revision Exists");
    }
    const projectReportRevision = projectReportRevisions[0];
    if (projectReportRevision.submittedAt) {
      const creation = body.projectReportRevision;
      delete creation.id;
      await this.projectReportRevisionRepository.create(creation as any);
    } else {
      await this.projectReportRevisionRepository.put({
        ...body.projectReportRevision,
        timelines: body.projectReportRevision.timelines.map(timeline => ({
          ...timeline,
          projectReportRevision: { id: body.projectReportRevision.id },
        })),
      } as any);
    }
    return { projectReportRevision: { id: projectReportRevision.id } };
  }

  async updateSubmitProjectReportRevision(
    body: ApiRpt008RequestBody,
  ): Promise<ApiRpt008ResponseOk> {
    const projectReportRevisions =
      await this.projectReportRevisionRepository.find({
        id: body.projectReportRevision.id,
      } as any);
    if (projectReportRevisions.length === 0) {
      throw new NotFoundException("No Project Report Exists");
    }
    const newProjectReportRevision =
      await this.projectReportRevisionRepository.patch(
        { id: projectReportRevisions[0].id } as any,
        revision => {
          const temp = revision;
          temp.submittedAt = new Date();
          return temp;
        },
      );
    return { projectReportRevision: { id: newProjectReportRevision[0].id } };
  }

  async createProjectReportTimeline(
    body: ApiRpt009RequestBody,
  ): Promise<ApiRpt009ResponseCreated> {
    const created = (
      await this.projectReportTimelineRepository.create(
        body.projectReportTimeline as any,
      )
    )[0];
    return { projectReportTimeline: { id: created.id } };
  }

  async updateProjectReportTimeline(
    body: ApiRpt010RequestBody,
  ): Promise<ApiRpt010ResponseOk> {
    const target = await this.projectReportTimelineRepository.find({
      id: body.projectReportTimeline.id,
    } as any);
    if (target.length === 0) {
      throw new NotFoundException("No Timeline Exists");
    }
    const newTimeline = await this.projectReportTimelineRepository.put(
      body.projectReportTimeline as any,
    );
    return { projectReportTimeline: { id: newTimeline.id } };
  }

  async deleteProjectReportTimeline(
    body: ApiRpt011RequestBody,
  ): Promise<ApiRpt011ResponseNoContent> {
    const existing = await this.projectReportTimelineRepository.find({
      id: body.projectReportTimeline.id,
    } as any);
    if (existing.length === 0) {
      throw new NotFoundException("No Timeline Exists");
    }
    await this.projectReportTimelineRepository.delete({
      id: body.projectReportTimeline.id,
    } as any);
    return {};
  }
}

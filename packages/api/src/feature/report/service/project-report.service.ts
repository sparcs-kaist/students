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

@Injectable()
export class ProjectReportService {
  constructor(
    private readonly projectReportRevisionRepository: ProjectReportRevisionRepository,
    private readonly projectReportTimelineRepository: ProjectReportTimelineRepository,
    private readonly projectReportRepository: ProjectReportRepository,
    private readonly budgetReportExpenseReivisionRepository: BudgetReportExpenseRevisionRepository,
    private readonly budgetProposalExpenseRepositoryRevision: BudgetProposalExpenseRevisionRepository,
  ) {}

  async getProjectReportRevisionList(
    body: ApiRpt003RequestBody,
  ): Promise<ApiRpt003ResponseOk> {
    const projectReportRevisions = (
      await this.projectReportRevisionRepository.find({
        projectReportId: body.projectReportId.id,
      } as any)
    ).map(revision => ({
      id: revision.id,
    }));
    return { projectReportRevisions };
  }

  async getProjectReportRevisionDetail(
    body: ApiRpt004RequestBody,
  ): Promise<ApiRpt004ResponseOk> {
    const projectReportRevision = (
      await this.projectReportRevisionRepository.find({
        projectReportId: body.projectReportRevisionInfo.id,
      } as any)
    ).reduce((a, b) => (a.submittedAt > b.submittedAt ? a : b));
    const budgetReports =
      await this.budgetReportExpenseReivisionRepository.find({
        projectReportId: projectReportRevision.projectReport.id,
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
      id: projectReportRevision.id,
      projectReport: { id: projectReportRevision.projectReport.id },
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
    const projectReportRevision = projectReportRevisions.reduce((a, b) =>
      a.submittedAt > b.submittedAt ? a : b,
    );
    if (!projectReportRevision.submittedAt) {
      const creation = projectReportRevision;
      delete creation.id;
      this.projectReportRevisionRepository.create(creation);
    } else {
      this.projectReportRevisionRepository.put(projectReportRevision); // Test
    }
    return { projectReportRevision: { id: projectReportRevision.id } };
  }

  async updateSubmitProjectReport(
    body: ApiRpt008RequestBody,
  ): Promise<ApiRpt008ResponseOk> {
    const projectReportRevisions =
      await this.projectReportRevisionRepository.find({
        id: body.projectReportRevision.id,
      } as any);
    if (projectReportRevisions.length === 0) {
      throw new NotFoundException("No Projcet Report Exists");
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
    this.projectReportTimelineRepository.delete({
      id: body.projectReportTimeline.id,
    } as any);
    return {};
  }
}

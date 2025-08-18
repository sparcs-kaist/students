import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { Public } from "@sparcs-students/api/common/decorators/skip-auth.decorator";
import {
  ApiRpt001RequestQuery,
  ApiRpt001ResponseOk,
  ApiRpt002RequestParam,
  ApiRpt002ResponseOk,
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
  ApiRpt014RequestQuery,
  ApiRpt014ResponseOk,
  ApiRpt015RequestBody,
  ApiRpt015ResponseCreated,
  ApiRpt016RequestBody,
  ApiRpt016ResponseCreated,
  ApiRpt017RequestBody,
  ApiRpt017ResponseOk,
  ApiRpt018RequestBody,
  ApiRpt018ResponseOk,
  ApiRpt019RequestBody,
  ApiRpt019ResponseNoContent,
  ApiRpt020RequestBody,
  ApiRpt020ResponseCreated,
  ApiRpt021RequestBody,
  ApiRpt021ResponseCreated,
  ApiRpt022RequestBody,
  ApiRpt022ResponseOk,
  ApiRpt023RequestBody,
  ApiRpt023ResponseOk,
  ApiRpt024RequestBody,
  ApiRpt024ResponseNoContent,
} from "@sparcs-students/interface/api/report/index";
import { ProjectReportService } from "../service/project-report.service";
import { ProjectReportPublicService } from "../service/project-report.public.service";
import { BudgetReportPublicService } from "../service/budget-report.public.service";
import { BudgetReportService } from "../service/budget-report.service";

@Controller("report")
export class ReportController {
  constructor(
    private readonly projectReportService: ProjectReportService,
    private readonly projectReportPublicService: ProjectReportPublicService,
    private readonly budgetReportService: BudgetReportService,
    private readonly budgetReportPublicService: BudgetReportPublicService,
  ) {}

  @Public()
  @Get("apiRpt001")
  async getProjectReportList(
    @Query() query: ApiRpt001RequestQuery,
  ): Promise<ApiRpt001ResponseOk> {
    return this.projectReportPublicService.getProjectReportList(query);
  }

  @Public()
  @Get("apiRpt002")
  async getProjectReportDetail(
    @Query() param: ApiRpt002RequestParam,
  ): Promise<ApiRpt002ResponseOk> {
    return this.projectReportPublicService.getProjectReportDetail(param);
  }

  @Public()
  @Post("apiRpt003")
  async getProjectReportRevisionList(
    @Body() body: ApiRpt003RequestBody,
  ): Promise<ApiRpt003ResponseOk> {
    return this.projectReportService.getProjectReportRevisionList(body);
  }

  @Public()
  @Post("apiRpt004")
  async getProjectReportRevisionDetail(
    @Body() body: ApiRpt004RequestBody,
  ): Promise<ApiRpt004ResponseOk> {
    return this.projectReportService.getProjectReportRevisionDetail(body);
  }

  @Public()
  @Post("apiRpt005")
  async createProjectReport(
    @Body() body: ApiRpt005RequestBody,
  ): Promise<ApiRpt005ResponseCreated> {
    return this.projectReportService.createProjectReport(body);
  }

  @Public()
  @Post("apiRpt006")
  async createProjectReportRevision(
    @Body() body: ApiRpt006RequestBody,
  ): Promise<ApiRpt006ResponseCreated> {
    return this.projectReportService.createProjectReportRevision(body);
  }

  @Public()
  @Put("apiRpt007")
  async updateProjectReportRevision(
    @Body() body: ApiRpt007RequestBody,
  ): Promise<ApiRpt007ResponseOk> {
    return this.projectReportService.updateProjectReportRevision(body);
  }

  @Public()
  @Patch("apiRpt008")
  async updateSubmitProjectReport(
    @Body() body: ApiRpt008RequestBody,
  ): Promise<ApiRpt008ResponseOk> {
    return this.projectReportService.updateSubmitProjectReport(body);
  }

  @Public()
  @Post("apiRpt009")
  async createProjectReportTimeline(
    @Body() body: ApiRpt009RequestBody,
  ): Promise<ApiRpt009ResponseCreated> {
    return this.projectReportService.createProjectReportTimeline(body);
  }

  @Public()
  @Put("apiRpt0010")
  async updateProjectReportTimeline(
    @Body() body: ApiRpt010RequestBody,
  ): Promise<ApiRpt010ResponseOk> {
    return this.projectReportService.updateProjectReportTimeline(body);
  }

  @Public()
  @Delete("apiRpt011")
  async deleteProjectReportTimeline(
    @Body() body: ApiRpt011RequestBody,
  ): Promise<ApiRpt011ResponseNoContent> {
    return this.projectReportService.deleteProjectReportTimeline(body);
  }

  @Public()
  @Get("apiRpt014")
  async getBudgetReport(
    @Query() query: ApiRpt014RequestQuery,
  ): Promise<ApiRpt014ResponseOk> {
    return this.budgetReportPublicService.getBudgetReport(query);
  }

  @Public()
  @Post("apiRpt015")
  async createBudgetReportIncome(
    @Body() body: ApiRpt015RequestBody,
  ): Promise<ApiRpt015ResponseCreated> {
    return this.budgetReportService.createBudgetReportIncome(body);
  }

  @Public()
  @Post("apiRpt016")
  async createBudgetReportIncomeRevision(
    @Body() body: ApiRpt016RequestBody,
  ): Promise<ApiRpt016ResponseCreated> {
    return this.budgetReportService.createBudgetReportIncomeRevision(body);
  }

  @Public()
  @Put("apiRpt017")
  async updateBudgetReportIncome(
    @Body() body: ApiRpt017RequestBody,
  ): Promise<ApiRpt017ResponseOk> {
    return this.budgetReportService.updateBudgetReportIncome(body);
  }

  @Public()
  @Patch("apiRpt018")
  async updateSubmitBudgetReportIncome(
    @Body() body: ApiRpt018RequestBody,
  ): Promise<ApiRpt018ResponseOk> {
    return this.budgetReportService.updateSubmitBudgetReportIncome(body);
  }

  @Public()
  @Delete("apiRpt019")
  async deleteBudgetReportIncome(
    @Body() body: ApiRpt019RequestBody,
  ): Promise<ApiRpt019ResponseNoContent> {
    return this.budgetReportService.deleteBudgetReportIncome(body);
  }

  @Public()
  @Post("apiRpt020")
  async createBudgetReportExpense(
    @Body() body: ApiRpt020RequestBody,
  ): Promise<ApiRpt020ResponseCreated> {
    return this.budgetReportService.createBudgetReportExpense(body);
  }

  @Public()
  @Post("apiRpt021")
  async createBudgetReportExpenseRevision(
    @Body() body: ApiRpt021RequestBody,
  ): Promise<ApiRpt021ResponseCreated> {
    return this.budgetReportService.createBudgetReportExpenseRevision(body);
  }

  @Public()
  @Put("apiRpt022")
  async updateBudgetReportExpense(
    @Body() body: ApiRpt022RequestBody,
  ): Promise<ApiRpt022ResponseOk> {
    return this.budgetReportService.updateBudgetReportExpense(body);
  }

  @Public()
  @Patch("apiRpt023")
  async submitBudgetReportExpense(
    @Body() body: ApiRpt023RequestBody,
  ): Promise<ApiRpt023ResponseOk> {
    return this.budgetReportService.submitBudgetReportExpense(body);
  }

  @Public()
  @Delete("apiRpt024")
  async deleteBudgetReportExpense(
    @Body() body: ApiRpt024RequestBody,
  ): Promise<ApiRpt024ResponseNoContent> {
    return this.budgetReportService.deleteBudgetReportExpense(body);
  }
}

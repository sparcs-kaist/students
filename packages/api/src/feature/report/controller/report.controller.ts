import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UsePipes,
} from "@nestjs/common";
import { Public } from "@sparcs-students/api/common/decorators/skip-auth.decorator";
import {
  apiRpt001,
  ApiRpt001RequestQuery,
  ApiRpt001ResponseOk,
  apiRpt002,
  ApiRpt002RequestParam,
  ApiRpt002ResponseOk,
  apiRpt003,
  ApiRpt003RequestBody,
  ApiRpt003ResponseOk,
  apiRpt004,
  ApiRpt004RequestBody,
  ApiRpt004ResponseOk,
  apiRpt005,
  ApiRpt005RequestBody,
  ApiRpt005ResponseCreated,
  apiRpt006,
  ApiRpt006RequestBody,
  ApiRpt006ResponseCreated,
  apiRpt007,
  ApiRpt007RequestBody,
  ApiRpt007ResponseOk,
  apiRpt008,
  ApiRpt008RequestBody,
  ApiRpt008ResponseOk,
  apiRpt009,
  ApiRpt009RequestBody,
  ApiRpt009ResponseCreated,
  apiRpt010,
  ApiRpt010RequestBody,
  ApiRpt010ResponseOk,
  apiRpt011,
  ApiRpt011RequestBody,
  ApiRpt011ResponseNoContent,
  apiRpt014,
  ApiRpt014RequestQuery,
  ApiRpt014ResponseOk,
  apiRpt015,
  ApiRpt015RequestBody,
  ApiRpt015ResponseCreated,
  apiRpt016,
  ApiRpt016RequestBody,
  ApiRpt016ResponseCreated,
  apiRpt017,
  ApiRpt017RequestBody,
  ApiRpt017ResponseOk,
  apiRpt018,
  ApiRpt018RequestBody,
  ApiRpt018ResponseOk,
  apiRpt019,
  ApiRpt019RequestBody,
  ApiRpt019ResponseNoContent,
  apiRpt020,
  ApiRpt020RequestBody,
  ApiRpt020ResponseCreated,
  apiRpt021,
  ApiRpt021RequestBody,
  ApiRpt021ResponseCreated,
  apiRpt022,
  ApiRpt022RequestBody,
  ApiRpt022ResponseOk,
  apiRpt023,
  ApiRpt023RequestBody,
  ApiRpt023ResponseOk,
  apiRpt024,
  ApiRpt024RequestBody,
  ApiRpt024ResponseNoContent,
} from "@sparcs-students/interface/api/report/index";
import { ZodPipe } from "@sparcs-students/api/common/pipes/zod-pipe";
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
  @UsePipes(new ZodPipe(apiRpt001))
  async getProjectReportList(
    @Query() query: ApiRpt001RequestQuery,
  ): Promise<ApiRpt001ResponseOk> {
    return this.projectReportPublicService.getProjectReportList(query);
  }

  @Public()
  @Get("apiRpt002/:projectReport")
  @UsePipes(new ZodPipe(apiRpt002))
  async getProjectReportDetail(
    @Param() param: ApiRpt002RequestParam,
  ): Promise<ApiRpt002ResponseOk> {
    return this.projectReportPublicService.getProjectReportDetail(param);
  }

  @Public()
  @Get("apiRpt003")
  @UsePipes(new ZodPipe(apiRpt003))
  async getProjectReportRevisionList(
    @Body() body: ApiRpt003RequestBody,
  ): Promise<ApiRpt003ResponseOk> {
    return this.projectReportService.getProjectReportRevisionList(body);
  }

  @Public()
  @Get("apiRpt004")
  @UsePipes(new ZodPipe(apiRpt004))
  async getProjectReportRevisionDetail(
    @Body() body: ApiRpt004RequestBody,
  ): Promise<ApiRpt004ResponseOk> {
    return this.projectReportService.getProjectReportRevisionDetail(body);
  }

  @Public()
  @Post("apiRpt005")
  @UsePipes(new ZodPipe(apiRpt005))
  async createProjectReport(
    @Body() body: ApiRpt005RequestBody,
  ): Promise<ApiRpt005ResponseCreated> {
    return this.projectReportService.createProjectReport(body);
  }

  @Public()
  @Post("apiRpt006")
  @UsePipes(new ZodPipe(apiRpt006))
  async createProjectReportRevision(
    @Body() body: ApiRpt006RequestBody,
  ): Promise<ApiRpt006ResponseCreated> {
    return this.projectReportService.createProjectReportRevision(body);
  }

  @Public()
  @Put("apiRpt007")
  @UsePipes(new ZodPipe(apiRpt007))
  async updateProjectReportRevision(
    @Body() body: ApiRpt007RequestBody,
  ): Promise<ApiRpt007ResponseOk> {
    return this.projectReportService.updateProjectReportRevision(body);
  }

  @Public()
  @Patch("apiRpt008")
  @UsePipes(new ZodPipe(apiRpt008))
  async updateSubmitProjectReportRevision(
    @Body() body: ApiRpt008RequestBody,
  ): Promise<ApiRpt008ResponseOk> {
    return this.projectReportService.updateSubmitProjectReportRevision(body);
  }

  @Public()
  @Post("apiRpt009")
  @UsePipes(new ZodPipe(apiRpt009))
  async createProjectReportTimeline(
    @Body() body: ApiRpt009RequestBody,
  ): Promise<ApiRpt009ResponseCreated> {
    return this.projectReportService.createProjectReportTimeline(body);
  }

  @Public()
  @Put("apiRpt010")
  @UsePipes(new ZodPipe(apiRpt010))
  async updateProjectReportTimeline(
    @Body() body: ApiRpt010RequestBody,
  ): Promise<ApiRpt010ResponseOk> {
    return this.projectReportService.updateProjectReportTimeline(body);
  }

  @Public()
  @Delete("apiRpt011")
  @UsePipes(new ZodPipe(apiRpt011))
  async deleteProjectReportTimeline(
    @Body() body: ApiRpt011RequestBody,
  ): Promise<ApiRpt011ResponseNoContent> {
    return this.projectReportService.deleteProjectReportTimeline(body);
  }

  @Public()
  @Get("apiRpt014")
  @UsePipes(new ZodPipe(apiRpt014))
  async getBudgetReport(
    @Query() query: ApiRpt014RequestQuery,
  ): Promise<ApiRpt014ResponseOk> {
    return this.budgetReportPublicService.getBudgetReport(query);
  }

  @Public()
  @Post("apiRpt015")
  @UsePipes(new ZodPipe(apiRpt015))
  async createBudgetReportIncome(
    @Body() body: ApiRpt015RequestBody,
  ): Promise<ApiRpt015ResponseCreated> {
    return this.budgetReportService.createBudgetReportIncome(body);
  }

  @Public()
  @Post("apiRpt016")
  @UsePipes(new ZodPipe(apiRpt016))
  async createBudgetReportIncomeRevision(
    @Body() body: ApiRpt016RequestBody,
  ): Promise<ApiRpt016ResponseCreated> {
    return this.budgetReportService.createBudgetReportIncomeRevision(body);
  }

  @Public()
  @Put("apiRpt017")
  @UsePipes(new ZodPipe(apiRpt017))
  async updateBudgetReportIncomeRevision(
    @Body() body: ApiRpt017RequestBody,
  ): Promise<ApiRpt017ResponseOk> {
    return this.budgetReportService.updateBudgetReportIncomeRevision(body);
  }

  @Public()
  @Patch("apiRpt018")
  @UsePipes(new ZodPipe(apiRpt018))
  async updateSubmitBudgetReportIncomeRevision(
    @Body() body: ApiRpt018RequestBody,
  ): Promise<ApiRpt018ResponseOk> {
    return this.budgetReportService.updateSubmitBudgetReportIncomeRevision(
      body,
    );
  }

  @Public()
  @Delete("apiRpt019")
  @UsePipes(new ZodPipe(apiRpt019))
  async deleteBudgetReportIncome(
    @Body() body: ApiRpt019RequestBody,
  ): Promise<ApiRpt019ResponseNoContent> {
    return this.budgetReportService.deleteBudgetReportIncome(body);
  }

  @Public()
  @Post("apiRpt020")
  @UsePipes(new ZodPipe(apiRpt020))
  async createBudgetReportExpense(
    @Body() body: ApiRpt020RequestBody,
  ): Promise<ApiRpt020ResponseCreated> {
    return this.budgetReportService.createBudgetReportExpense(body);
  }

  @Public()
  @Post("apiRpt021")
  @UsePipes(new ZodPipe(apiRpt021))
  async createBudgetReportExpenseRevision(
    @Body() body: ApiRpt021RequestBody,
  ): Promise<ApiRpt021ResponseCreated> {
    return this.budgetReportService.createBudgetReportExpenseRevision(body);
  }

  @Public()
  @Put("apiRpt022")
  @UsePipes(new ZodPipe(apiRpt022))
  async updateBudgetReportExpenseRevision(
    @Body() body: ApiRpt022RequestBody,
  ): Promise<ApiRpt022ResponseOk> {
    return this.budgetReportService.updateBudgetReportExpenseRevision(body);
  }

  @Public()
  @Patch("apiRpt023")
  @UsePipes(new ZodPipe(apiRpt023))
  async submitBudgetReportExpenseRevision(
    @Body() body: ApiRpt023RequestBody,
  ): Promise<ApiRpt023ResponseOk> {
    return this.budgetReportService.submitBudgetReportExpenseRevision(body);
  }

  @Public()
  @Delete("apiRpt024")
  @UsePipes(new ZodPipe(apiRpt024))
  async deleteBudgetReportExpense(
    @Body() body: ApiRpt024RequestBody,
  ): Promise<ApiRpt024ResponseNoContent> {
    return this.budgetReportService.deleteBudgetReportExpense(body);
  }
}

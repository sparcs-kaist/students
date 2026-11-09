import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UsePipes,
} from "@nestjs/common";
import {
  apiPrp016,
  apiPrp018,
  apiPrp019,
  apiPrp021,
  apiPrp022,
  apiPrp024,
  ApiPrp016RequestBody,
  ApiPrp018RequestParam,
  ApiPrp019RequestBody,
  ApiPrp021RequestParam,
  ApiPrp022RequestBody,
  ApiPrp024RequestParam,
} from "@sparcs-students/interface/api/proposal/index";
import { Public } from "@sparcs-students/api/common/decorators/skip-auth.decorator";
import { ZodPipe } from "@sparcs-students/api/common/pipes/zod-pipe";
import {
  GetStudent,
  StudentProfile,
} from "@sparcs-students/api/common/decorators/get-user.decorator";
import { StaffOnly } from "@sparcs-students/api/common/decorators/require-position.decorator";
import { ProposalService } from "../service/proposal.service";

@StaffOnly()
@Controller("staff/proposals")
export class ProposalStaffController {
  constructor(private readonly proposalService: ProposalService) {}

  // 각 집행부원 권한으로 IncomeDocumentReview 생성
  @Post("budget-proposals/income-document-review/create")
  @UsePipes(new ZodPipe(apiPrp016))
  async createBudgetProposalIncomeDocumentReview(
    @GetStudent() student: StudentProfile,
    @Body() body: ApiPrp016RequestBody,
  ) {
    return this.proposalService.createBudgetProposalIncomeDocumentReview(
      student,
      body.budgetProposalIncomeDocumentReview,
    );
  }

  // 각 집행부원 권한으로 IncomeDocumentReview 삭제
  @Public()
  @Delete(
    "budget-proposals/income-document-review/delete/:budgetProposalIncomeDocumentReviewId",
  )
  @UsePipes(new ZodPipe(apiPrp018))
  async deleteBudgetProposalIncomeDocumentReview(
    @Param() params: ApiPrp018RequestParam,
  ) {
    return this.proposalService.deleteBudgetProposalIncomeDocumentReview(
      params,
    );
  }

  // 각 집행부원 권한으로 ExpenseDocumentReview 생성
  @Post("budget-proposals/expense-document-review/create")
  @UsePipes(new ZodPipe(apiPrp019))
  async createBudgetProposalExpenseDocumentReview(
    @GetStudent() student: StudentProfile,
    @Body() body: ApiPrp019RequestBody,
  ) {
    return this.proposalService.createBudgetProposalExpenseDocumentReview(
      student,
      body.budgetProposalExpenseDocumentReview,
    );
  }

  // 각 집행부원 권한으로 ExpenseDocumentReview 삭제
  @Public()
  @Delete(
    "budget-proposals/expense-document-review/delete:budgetProposalExpenseDocumentReviewId",
  )
  @UsePipes(new ZodPipe(apiPrp021))
  async deleteBudgetProposalExpenseDocumentReview(
    @Param() params: ApiPrp021RequestParam,
  ) {
    return this.proposalService.deleteBudgetProposalExpenseDocumentReview(
      params,
    );
  }

  // 각 집행부원 권한으로 ProjecProposalDocumentReview 생성
  @Post("project-proposals/document-review/create")
  @UsePipes(new ZodPipe(apiPrp022))
  async createProjectProposalDocumentReview(
    @GetStudent() student: StudentProfile,
    @Body() body: ApiPrp022RequestBody,
  ) {
    return this.proposalService.createProjectProposalDocumentReview(
      student,
      body.projectProposalDocumentReview,
    );
  }

  // 각 집행부원 권한으로 ProjectProposalDocumentReview 삭제
  @Public()
  @Delete(
    "project-proposals/document-review/delete/:projectProposalDocumentReviewId",
  )
  @UsePipes(new ZodPipe(apiPrp024))
  async deleteProjectProposalDocumentReview(
    @Param() params: ApiPrp024RequestParam,
  ) {
    return this.proposalService.deleteProjectProposalDocumentReview(params);
  }
}

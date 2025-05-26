import {
  Injectable,
  NotFoundException,
  ConflictException,
  UnprocessableEntityException,
} from "@nestjs/common";
// import { MProjectProposal } from '@sparcs-students/package/api/feature/proposal/type/project-proposal.type';
import { ProjectProposalRepository } from "@sparcs-students/package/api/feature/proposal/repository/project-proposal.repository";
import { IProjectProposalCreate } from "@sparcs-students/package/api/feature/proposal/model/project-proposal.model";
import { ApiPrp005RequestBody } from "@sparcs-students/interface/api/proposal/endpoint/apiPrp005";
import { ApiPrp006RequestBody } from "@sparcs-students/interface/api/proposal/endpoint/apiPrp006";

@Injectable()
export class ProjectProposalService {
  constructor(private readonly repository: ProjectProposalRepository) {}

  async getProposal(id: number) {
    const proposal = await this.repository.findById(id);
    if (!proposal) throw new NotFoundException("Proposal not found");
    return proposal;
  }

  async createProposal(body: IProjectProposalCreate) {
    const created = await this.repository.createWithInitialRevision(body);
    return { projectProposalId: created.id };
  }

  async updateProposal(id: number, body: ApiPrp005RequestBody) {
    const updated = await this.repository.updateOrCreateRevision(id, body);
    return { success: updated };
  }

  async submitProposal(id: number, body: ApiPrp006RequestBody) {
    const result = await this.repository.submitProposal(id, body);
    if (result === "no-change")
      throw new NotFoundException(
        "No changes detected from the previously submitted content.",
      );
    if (result === "invalid")
      throw new UnprocessableEntityException("Some required fields are empty.");
    return {
      success: true,
      submittedIds: [result],
    };
  }

  async deleteProposal(id: number) {
    const result = await this.repository.safeDelete(id);
    if (result === "not-found")
      throw new NotFoundException("Project proposal not found.");
    if (result === "conflict")
      throw new ConflictException(
        "Cannot delete a submitted project proposal.",
      );
    return { success: true };
  }
}

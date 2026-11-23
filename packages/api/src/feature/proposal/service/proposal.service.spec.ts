import { ForbiddenException, NotFoundException } from "@nestjs/common";
import { ProposalService } from "./proposal.service";

// Keep repository imports available for Nest metadata without opening a DB
// connection. Each test supplies only the repository methods it exercises.
jest.mock("@sparcs-students/api/common/base/base.single.repository", () => ({
  BaseSingleTableRepository: class {},
}));

describe("ProposalService.updateProjectProposalTimeline", () => {
  const student = { studentId: 1 };
  const body = {
    organizationId: 2,
    code: 30,
    projectProposalTimeline: { id: 42, detail: "Updated second timeline" },
  };
  const firstTimeline = {
    id: 41,
    projectProposalRevision: { code: 30 },
    detail: "First timeline",
    note: "Keep this note",
  };
  const secondTimeline = {
    ...firstTimeline,
    id: 42,
    detail: "Second timeline",
  };

  const managers = { find: jest.fn() };
  const proposals = { find: jest.fn() };
  const revisions = { find: jest.fn() };
  const timelines = { find: jest.fn(), patch: jest.fn() };
  let service: ProposalService;

  beforeEach(() => {
    jest.resetAllMocks();
    service = Object.assign(Object.create(ProposalService.prototype), {
      organizationManagerRepository: managers,
      projectProposalRepository: proposals,
      projectProposalRevisionRepository: revisions,
      projectProposalTimelineRepository: timelines,
    });
    managers.find.mockResolvedValue([{ id: 1 }]);
    proposals.find.mockResolvedValue([{ id: 3, organization: { id: 2 } }]);
    revisions.find.mockResolvedValue([{ id: 4, projectProposal: { id: 3 } }]);
    timelines.find.mockImplementation(async query =>
      [firstTimeline, secondTimeline].filter(
        timeline =>
          timeline.projectProposalRevision.code ===
            query.projectProposalRevision &&
          (query.id === undefined || timeline.id === query.id),
      ),
    );
    timelines.patch.mockImplementation(async (query, patch) => {
      const target = [firstTimeline, secondTimeline].find(
        timeline => timeline.id === query.id,
      );
      return [patch(target)];
    });
  });

  it("updates the requested second timeline and preserves omitted fields", async () => {
    const result = await service.updateProjectProposalTimeline(student, body);

    expect(timelines.find).toHaveBeenCalledWith({
      id: 42,
      projectProposalRevision: 30,
    });
    expect(timelines.patch).toHaveBeenCalledWith(
      { id: 42, projectProposalRevision: 30 },
      expect.any(Function),
    );
    expect(result.projectProposalTimeline).toEqual([
      { ...secondTimeline, detail: body.projectProposalTimeline.detail },
    ]);
    expect(firstTimeline.detail).toBe("First timeline");
  });

  it("rejects a timeline ID that does not belong to the supplied code", async () => {
    await expect(
      service.updateProjectProposalTimeline(student, {
        ...body,
        projectProposalTimeline: { id: 99, detail: "Other proposal timeline" },
      }),
    ).rejects.toBeInstanceOf(NotFoundException);

    expect(timelines.patch).not.toHaveBeenCalled();
  });

  it("rejects an organization that does not own the proposal", async () => {
    proposals.find.mockResolvedValue([{ id: 3, organization: { id: 9 } }]);

    await expect(
      service.updateProjectProposalTimeline(student, body),
    ).rejects.toBeInstanceOf(ForbiddenException);

    expect(timelines.find).not.toHaveBeenCalled();
    expect(timelines.patch).not.toHaveBeenCalled();
  });

  it("does not access timelines when the caller is not a manager", async () => {
    managers.find.mockResolvedValue([]);

    await expect(
      service.updateProjectProposalTimeline(student, body),
    ).rejects.toThrow("Not a manager of this organization");

    expect(revisions.find).not.toHaveBeenCalled();
    expect(timelines.patch).not.toHaveBeenCalled();
  });
});

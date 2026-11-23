import { useQuery } from "@tanstack/react-query";
import { zId } from "@sparcs-students/interface/common/type/ids";
import {
  fetchProjectProposalSubmissionDates,
  fetchRecentProjectProposalRevision,
} from "./projectProposalApi";

// This is a ProjectProposal ID, not the organization ID in the result URL
// or a revision ID. Invalid or missing IDs must not trigger a request.
export const useProjectProposal = (projectProposalId: number | null) => {
  const parsedId = zId.safeParse(projectProposalId);
  const id = parsedId.success ? parsedId.data : null;

  const revision = useQuery({
    queryKey: ["project-proposal", id, "recent"],
    enabled: id !== null,
    queryFn: ({ signal }) =>
      fetchRecentProjectProposalRevision(
        { projectProposal: zId.parse(id) },
        signal,
      ),
  });

  const submissionDates = useQuery({
    queryKey: ["project-proposal", id, "submission-dates"],
    enabled: id !== null,
    queryFn: ({ signal }) =>
      fetchProjectProposalSubmissionDates(
        { projectProposal: zId.parse(id) },
        signal,
      ),
  });

  return { revision, submissionDates };
};

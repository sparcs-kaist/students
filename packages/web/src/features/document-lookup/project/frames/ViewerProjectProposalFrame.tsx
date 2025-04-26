import { useParams } from "next/navigation";
import FlexWrapper from "@sparcs-students/web/common/components/FlexWrapper";
import {
  mockOperationPlanData,
  mockViewerProjectData,
} from "@sparcs-students/web/features/document-lookup/project/services/_mock/mockProjectProposalData";
import ProjectTable from "@sparcs-students/web/features/document-lookup/project/components/ProjectTable";
import OperationPlan from "@sparcs-students/web/features/document-lookup/project/components/OperationPlan";

const ViewerProjectProposalFrame = () => {
  const { id } = useParams();

  return (
    <FlexWrapper direction="column" gap={60} style={{ padding: "20 0px" }}>
      <ProjectTable pageId={id} data={mockViewerProjectData} isProposal />
      <OperationPlan {...mockOperationPlanData} />
    </FlexWrapper>
  );
};

export default ViewerProjectProposalFrame;

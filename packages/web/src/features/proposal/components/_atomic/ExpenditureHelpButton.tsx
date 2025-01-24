import HelpOutlineButton from "@mui/icons-material/HelpOutline";
import React, { useState } from "react";
import FlexWrapper from "@sparcs-students/web/common/components/FlexWrapper";
import styled from "styled-components";

const ToolTipWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 16px 20px;
  font-size: 16px;
  line-height: 20px;
  text-align: center;

  width: 340px;
  box-shadow: 0px 8px 8px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  position: absolute;
  transform: translateY(-60%) translateX(32px);
`;

const ExpenditureHelpButton = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <FlexWrapper direction="row" gap={8}>
      <HelpOutlineButton
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
      {showTooltip && (
        <ToolTipWrapper>
          지출 항목을 클릭하면 각 사업의 상세 설명을 확인할 수 있습니다.
        </ToolTipWrapper>
      )}
    </FlexWrapper>
  );
};

export default ExpenditureHelpButton;

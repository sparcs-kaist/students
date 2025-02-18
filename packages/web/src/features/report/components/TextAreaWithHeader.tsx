import React from "react";
import styled from "styled-components";

interface TextAreaProps {
  header: string;
  contents: string[];
}

const Slash = styled.div`
  display: flex;
  width: 60px;
  font-size: 20px;
  line-height: 28px;
  font-weight: 400;
  align-items: center;
  justify-content: center;
`;

const TextArea = styled.div`
  padding: 8px 12px;
  font-size: 16px;
  line-height: 20px;
  font-weight: 400;
  border: 1px solid ${({ theme }) => theme.colors.GRAY[100]};
  border-radius: 4px;
  width: 100%;
`;

const TextAreaWithHeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  font-size: 24px;
  line-height: 30px;
  font-weight: 700;
  width: 100%;
`;

const TextAreaRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const TextAreaWithHeader: React.FC<TextAreaProps> = ({ header, contents }) => (
  <TextAreaWithHeaderWrapper>
    {header}
    <TextAreaRow>
      {contents.map((elm, index) => (
        <React.Fragment key={index}>
          <TextArea>{elm}</TextArea>
          {index < contents.length - 1 && <Slash>/</Slash>}
        </React.Fragment>
      ))}
    </TextAreaRow>
  </TextAreaWithHeaderWrapper>
);

export default TextAreaWithHeader;

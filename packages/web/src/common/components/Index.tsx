import styled from "styled-components";
import React from "react";
import isPropValid from "@emotion/is-prop-valid";
import Typography from "./Typography";

const IndexWrapper = styled.div`
  font-size: 16px;
  line-height: 20px;
  font-weight: 400;
  white-space: nowrap;
  width: fit-content;
  cursor: pointer;
`;

interface IndexContentsProps {
  name: string;
  reference: React.RefObject<HTMLDivElement>;
}

interface IndexProps {
  title: string;
  contents: IndexContentsProps[];
  headerHeight: number;
}

const IndexArea = styled.div.withConfig({
  shouldForwardProp: prop => isPropValid(prop),
})<{ headerHeight: number }>`
  display: flex;
  flex-direction: column;
  gap: 32px;
  position: sticky;
  top: ${({ headerHeight }) => `${headerHeight}px`};
  height: fit-content;
`;

const Index: React.FC<IndexProps> = ({ title, contents, headerHeight }) => {
  const scrollToTarget = (target: React.RefObject<HTMLDivElement>) => {
    if (target.current) {
      const top =
        target.current.getBoundingClientRect().top +
        window.scrollY -
        headerHeight;
      console.log(`Top value of target: ${top}`);
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <IndexArea headerHeight={headerHeight}>
      <Typography fs={24} lh={30} fw="BOLD">
        {title}
      </Typography>
      {contents.map((elm, index) => (
        <React.Fragment key={index}>
          <IndexWrapper onClick={() => scrollToTarget(elm.reference)}>
            {elm.name}
          </IndexWrapper>
        </React.Fragment>
      ))}
    </IndexArea>
  );
};

export default Index;

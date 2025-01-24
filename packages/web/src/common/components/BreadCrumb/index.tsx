import React from "react";
import styled from "styled-components";
import colors from "@sparcs-students/web/styles/themes/colors";
import Link from "next/link";
import BreadCrumbItem from "./_atomic/BreadCrumbItem";
import Icon from "../Icon";

interface BreadCrumbItemDetails {
  name: string;
  path: string;
}

interface BreadCrumbProps {
  items: BreadCrumbItemDetails[];
  enableLast?: boolean;
  isWithMain?: boolean;
}

const BreadCrumbContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const BreadCrumb: React.FC<BreadCrumbProps> = ({
  items,
  enableLast = false,
  isWithMain = false,
}) => {
  if (isWithMain) {
    items.unshift({ name: "메인", path: "/" });
  }
  return (
    <BreadCrumbContainer>
      {items.map((item, index) => (
        <React.Fragment key={item.name}>
          <Link href={item.path} passHref>
            <BreadCrumbItem
              text={item.name}
              disabled={index === items.length - 1 ? !enableLast : false}
              isLastChild={index === items.length - 1}
            />
          </Link>
          {index < items.length - 1 && (
            <Icon type="chevron_right" size={20} color={colors.GRAY[400]} />
          )}
        </React.Fragment>
      ))}
    </BreadCrumbContainer>
  );
};

export default BreadCrumb;

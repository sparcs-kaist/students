import React from "react";
import styled from "styled-components";
import colors from "@sparcs-students/web/styles/themes/colors";
import Link from "next/link";
import { useRouter } from "next/navigation";
import BreadCrumbItem from "./_atomic/BreadCrumbItem";
import Icon from "../Icon";

interface BreadCrumbItemDetails {
  name: string;
  path: string;
}

interface BreadCrumbProps {
  items: BreadCrumbItemDetails[];
  enableLast?: boolean;
}

const BreadCrumbContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const BreadCrumb: React.FC<BreadCrumbProps> = ({
  items,
  enableLast = false,
}) => {
  const router = useRouter();
  const itemWithMain: BreadCrumbItemDetails[] = [
    { name: "메인", path: "/" },
    ...items,
  ];

  const currentPath =
    typeof window !== "undefined" ? window.location.pathname : "";

  return (
    <BreadCrumbContainer>
      {itemWithMain.map((item, index) => {
        const isCurrentPath = item.path === currentPath;

        return (
          <React.Fragment key={item.name}>
            <Link
              href={item.path}
              passHref
              onClick={event => {
                if (isCurrentPath) {
                  event.preventDefault();
                  router.replace(`${item.path}?refresh=${Date.now()}`);
                }
              }}
            >
              <BreadCrumbItem
                text={item.name}
                disabled={
                  index === itemWithMain.length - 1 ? !enableLast : false
                }
                isLastChild={index === itemWithMain.length - 1}
              />
            </Link>
            {index < itemWithMain.length - 1 && (
              <Icon type="chevron_right" size={20} color={colors.GRAY[400]} />
            )}
          </React.Fragment>
        );
      })}
    </BreadCrumbContainer>
  );
};

export default BreadCrumb;

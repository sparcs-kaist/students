"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { useAuth } from "@sparcs-students/web/common/providers/AuthContext";
import colors from "@sparcs-students/web/styles/themes/colors";
import { getProfileBucketLabel } from "@sparcs-students/web/utils/getUserType";
import { getLocalStorageItem } from "@sparcs-students/web/utils/localStorage";
import useOrganizationStore from "@sparcs-students/web/features/organization-manage/stores/useOrganizationStore";
import { axiosClientWithAuth } from "@sparcs-students/web/lib/axios";
import apiOrg025, {
  ApiOrg025ResponseOk,
} from "@sparcs-students/interface/api/organization/endpoint/apiOrg025";

import Button from "@sparcs-students/web/common/components/Buttons/Button";
import FlexWrapper from "@sparcs-students/web/common/components/FlexWrapper";
import ProfileList from "@sparcs-students/web/common/components/Header/_atomic/ProfileList";
import Icon from "@sparcs-students/web/common/components/Icon";
import Typography from "@sparcs-students/web/common/components/Typography";

interface MyMenuProps {
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedToken: string;
  setSelectedToken: React.Dispatch<React.SetStateAction<string>>;
}

const MyMenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  box-sizing: border-box;
  width: 240px;
  max-width: calc(100vw - 32px);
  padding: 16px 20px;
  gap: 16px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.GRAY[100]};
  position: absolute;
  top: 50px;
  right: 16px;
  background-color: ${({ theme }) => theme.colors.WHITE};
  box-shadow: 0px 2px 4px ${({ theme }) => theme.colors.GRAY[100]};
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.GRAY[100]};
`;

const ProfileListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
  gap: 12px;
`;

const OrgSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

const OrgRow = styled.button<{ $selected: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  width: 100%;
  box-sizing: border-box;
  padding: 8px 12px;
  margin: 0;
  border-radius: 4px;
  cursor: pointer;
  text-align: left;
  font: inherit;
  color: ${({ theme }) => theme.colors.BLACK};
  background: ${({ theme }) => theme.colors.WHITE};
  border: ${({ theme, $selected }) =>
    $selected
      ? `1px solid ${theme.colors.PRIMARY}`
      : `1px solid ${theme.colors.GRAY[100]}`};
  &:hover {
    background-color: ${({ theme }) => theme.colors.GREEN[50]};
  }
`;

const MyMenu: React.FC<MyMenuProps> = ({
  setIsMenuOpen,
  selectedToken,
  setSelectedToken,
}) => {
  const router = useRouter();
  const { currentOrganizationId, setCurrentOrganizationId } =
    useOrganizationStore();
  const [organizations, setOrganizations] = useState<
    ApiOrg025ResponseOk["organizations"]
  >([]);
  const [orgsLoadFailed, setOrgsLoadFailed] = useState(false);

  const handleMyPageClick = () => {
    router.push("/my");
    setIsMenuOpen(false);
  };
  const { logout } = useAuth();
  const handleLogout = async () => {
    logout();
    setIsMenuOpen(false);
  };

  const t = useTranslations();

  const raw = getLocalStorageItem("responseToken");
  let parsed: unknown = {};
  try {
    parsed = raw ? JSON.parse(raw) : {};
  } catch {
    parsed = {};
  }

  let profiles: {
    roleKey: string;
    profileType: string;
    token: string;
  }[];

  if (typeof parsed === "string" && parsed.length > 0) {
    profiles = [
      {
        roleKey: "default",
        profileType: "내 계정",
        token: parsed,
      },
    ];
  } else if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
    const entries = Object.entries(parsed as Record<string, string>).filter(
      ([, v]) => typeof v === "string" && v.length > 0,
    );
    profiles =
      entries.length > 0
        ? entries.map(([roleKey, token]) => ({
            roleKey,
            profileType: getProfileBucketLabel(roleKey),
            token,
          }))
        : [];
  } else {
    profiles = [];
  }

  if (profiles.length === 0) {
    const access = getLocalStorageItem("accessToken");
    if (access) {
      profiles = [
        {
          roleKey: "access",
          profileType: "내 계정",
          token: access,
        },
      ];
    }
  }

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      if (!getLocalStorageItem("accessToken")) {
        setOrganizations([]);
        return;
      }
      try {
        const { data } = await axiosClientWithAuth.get(apiOrg025.url());
        const parsedBody = apiOrg025.responseBodyMap[200].parse(data);
        if (!cancelled) {
          setOrganizations(parsedBody.organizations);
          setOrgsLoadFailed(false);
        }
      } catch {
        if (!cancelled) {
          setOrganizations([]);
          setOrgsLoadFailed(true);
        }
      }
    };
    load().catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [selectedToken]);

  const handlePickOrganization = (organizationId: number) => {
    setCurrentOrganizationId(organizationId);
    setIsMenuOpen(false);
  };

  return (
    <MyMenuWrapper>
      <ProfileListWrapper>
        <ProfileList
          profiles={profiles}
          setIsMenuOpen={setIsMenuOpen}
          selectedToken={selectedToken}
          setSelectedToken={setSelectedToken}
        />
      </ProfileListWrapper>

      {organizations.length > 0 && (
        <>
          <Divider />
          <OrgSection>
            <Typography fw="MEDIUM" fs={14} lh={16}>
              {t("내 단체")}
            </Typography>
            {organizations.map(org => {
              const selected = currentOrganizationId === org.organizationId;
              return (
                <OrgRow
                  key={org.organizationId}
                  type="button"
                  $selected={selected}
                  onClick={() => handlePickOrganization(org.organizationId)}
                >
                  {selected ? (
                    <Icon type="check_box" size={16} color="PRIMARY" />
                  ) : (
                    <Icon
                      type="check_box_outline_blank"
                      size={16}
                      color="BLACK"
                    />
                  )}
                  <Typography fw="MEDIUM" fs={14} lh={18} color="BLACK">
                    {org.name}
                  </Typography>
                </OrgRow>
              );
            })}
          </OrgSection>
        </>
      )}

      {organizations.length === 0 && orgsLoadFailed && (
        <>
          <Divider />
          <Typography fs={12} lh={16} color="GRAY.400">
            {t("단체 목록을 불러오지 못했습니다")}
          </Typography>
        </>
      )}

      <Divider />
      <FlexWrapper direction="column" gap={12} style={{ width: "100%" }}>
        <Button
          type="default"
          onClick={handleMyPageClick}
          style={{
            color: colors.WHITE,
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          {t("마이페이지")}
        </Button>
        <Button
          type="reverse"
          onClick={handleLogout}
          style={{
            color: colors.PRIMARY,
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          {t("로그아웃")}
        </Button>
      </FlexWrapper>
    </MyMenuWrapper>
  );
};

export default MyMenu;

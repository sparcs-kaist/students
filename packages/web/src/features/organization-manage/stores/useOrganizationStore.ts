// @sparcs-students/web/stores/useOrganizationStore.ts

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist, createJSONStorage } from "zustand/middleware";

interface OrganizationState {
  currentOrganizationId: number | null;
  setCurrentOrganizationId: (id: number) => void;
}

const useOrganizationStore = create(
  persist(
    immer<OrganizationState>(set => ({
      currentOrganizationId: null, // TODO: 로그인 시 또는 페이지 진입 시 실제 조직 ID로 설정 필요
      setCurrentOrganizationId: (id: number) =>
        set(state => {
          state.currentOrganizationId = id;
        }),
    })),
    {
      name: "organization",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useOrganizationStore;

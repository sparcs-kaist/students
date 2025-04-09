import { LightTagColor } from "@sparcs-students/web/common/components/Tag/LightTag";
import { DarkTagColor } from "@sparcs-students/web/common/components/Tag/DarkTag";

interface StatusDetail {
  text: string;
  color: LightTagColor;
}

interface DarkStatusDetail {
  text: string;
  color: DarkTagColor;
}

const getTagDetail = <T extends number>(
  status: T,
  enumDictionary: {
    [key in T]: StatusDetail;
  },
): StatusDetail => enumDictionary[status] || { text: "None", color: "GRAY" };

const getDarkTagDetail = <T extends number>(
  status: T,
  enumDictionary: {
    [key in T]: DarkStatusDetail | StatusDetail;
  },
) => enumDictionary[status] || { text: "None", color: "GRAY" };

export { getTagDetail, getDarkTagDetail };
export type { StatusDetail, DarkStatusDetail };

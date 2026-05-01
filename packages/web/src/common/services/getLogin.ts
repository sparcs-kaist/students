import apiAut001, {
  ApiAut001ResponseOk,
} from "@sparcs-students/interface/api/auth/endpoint/apiAut001";

import { axiosClient } from "@sparcs-students/web/lib/axios";

const getLogin = async (): Promise<ApiAut001ResponseOk> => {
  const currentUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}${window.location.search}${window.location.hash}`;

  const { data } = await axiosClient.get(apiAut001.url(), {
    params: { next: currentUrl },
  });

  return apiAut001.responseBodyMap[200].parse(data);
};

export default getLogin;

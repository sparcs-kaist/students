import { z } from "zod";
import apiPrp108, {
  ApiPrp108RequestQuery,
  ApiPrp108ResponseOk,
} from "@sparcs-students/interface/api/proposal/endpoint/apiPrp108";
import apiPrp109, {
  ApiPrp109RequestQuery,
} from "@sparcs-students/interface/api/proposal/endpoint/apiPrp109";
import { axiosClient } from "@sparcs-students/web/lib/axios";

// The current backend returns {} when the proposal does not exist, and omits
// projectProposalRevision when it has no revisions yet.
const recentRevisionSchema = apiPrp108.responseBodyMap[200].partial();

export const fetchRecentProjectProposalRevision = async (
  query: ApiPrp108RequestQuery,
  signal?: AbortSignal,
): Promise<ApiPrp108ResponseOk["projectProposalRevision"] | null> => {
  const params = apiPrp108.requestQuery.parse(query);
  const response = await axiosClient.get<unknown>(apiPrp108.url(), {
    params,
    signal,
  });

  return (
    recentRevisionSchema.parse(response.data).projectProposalRevision ?? null
  );
};

// axiosClient converts ISO timestamps to Date objects. Accept either wire
// strings or transformed dates and expose Date[] consistently to the UI.
const submissionDatesSchema = z.array(
  z.union([z.string().datetime(), z.date()]).pipe(z.coerce.date()),
);

export const fetchProjectProposalSubmissionDates = async (
  query: ApiPrp109RequestQuery,
  signal?: AbortSignal,
): Promise<Date[]> => {
  const params = apiPrp109.requestQuery.parse(query);
  const response = await axiosClient.get<unknown>(apiPrp109.url(), {
    params,
    signal,
  });

  return submissionDatesSchema.parse(response.data);
};

import axios, { AxiosResponse } from "axios";
import * as crypto from "crypto";
import * as querystring from "querystring";
import logger from "@sparcs-students/api/common/util/logger";
import { SSOUser } from "../dto/sso-user.dto";

interface Urls {
  [key: string]: string;
}

interface Params {
  [key: string]: string;
}

export class SSOClient {
  private readonly SERVER_DOMAIN = "https://sparcssso.kaist.ac.kr/";

  private readonly BETA_DOMAIN = "https://ssobeta.sparcs.org/";

  private readonly API_PREFIX = "api/";

  private readonly VERSION_PREFIX = "v2/";

  private readonly TIMEOUT = 60;

  private DOMAIN: string;

  private URLS: Urls;

  private clientId: string;

  private secretKey: Buffer;

  constructor(
    clientId: string,
    secretKey: string,
    isBeta = false,
    serverAddr = "",
  ) {
    this.DOMAIN =
      serverAddr || (isBeta ? this.BETA_DOMAIN : this.SERVER_DOMAIN);

    const baseUrl = `${this.DOMAIN}${this.API_PREFIX}${this.VERSION_PREFIX}`;
    this.URLS = {
      token_require: `${baseUrl}token/require/`,
      token_info: `${baseUrl}token/info/`,
      logout: `${baseUrl}logout/`,
      unregister: `${baseUrl}unregister/`,
      point: `${baseUrl}point/`,
      notice: `${baseUrl}notice/`,
    };

    this.clientId = clientId;
    this.secretKey = Buffer.from(secretKey, "utf-8");
  }

  private signPayload(
    payload: string[],
    appendTimestamp = true,
  ): [string, number] {
    const timestamp = Math.floor(Date.now() / 1000);
    if (appendTimestamp) payload.push(timestamp.toString());
    const msg = Buffer.from(payload.join(""), "utf-8");
    const sign = crypto
      .createHmac("md5", this.secretKey)
      .update(msg)
      .digest("hex");
    return [sign, timestamp];
  }

  private validateSign(
    payload: string[],
    timestamp: string,
    sign: string,
  ): boolean {
    const [expectedSign, clientTimestamp] = this.signPayload(payload, false);
    const timeDiff = Math.abs(Number(clientTimestamp) - Number(timestamp));

    const isValidTime = timeDiff <= 10;
    const isValidSign = crypto.timingSafeEqual(
      Buffer.from(expectedSign, "utf-8"),
      Buffer.from(sign, "utf-8"),
    );

    return isValidTime && isValidSign;
  }

  private async postData<T>(url: string, data: Params): Promise<T> {
    try {
      const response: AxiosResponse = await axios.post(
        url,
        querystring.stringify(data),
      );

      if (response.status === 400) throw new Error("INVALID_REQUEST");
      if (response.status === 403) throw new Error("NO_PERMISSION");
      if (response.status !== 200) throw new Error("UNKNOWN_ERROR");

      const result = response.data;
      if (result.kaist_info && typeof result.kaist_info === "string") {
        result.kaist_info = JSON.parse(result.kaist_info);
      }

      return result as T;
    } catch (err) {
      logger.error(err);
      throw new Error("INVALID_OBJECT");
    }
  }

  public getLoginParams(): { url: string; state: string } {
    const state = crypto.randomBytes(10).toString("hex");
    const params: Params = { client_id: this.clientId, state };
    const url = `${this.URLS.token_require}?${querystring.stringify(params)}`;
    return { url, state };
  }

  public async getUserInfo(code: string): Promise<SSOUser> {
    const [sign, timestamp] = this.signPayload([code]);
    const params = {
      client_id: this.clientId,
      code,
      timestamp: timestamp.toString(),
      sign,
    };
    return this.postData<SSOUser>(this.URLS.token_info, params);
  }

  public getLogoutUrl(sid: string, redirectUri: string): string {
    const [sign, timestamp] = this.signPayload([sid, redirectUri]);
    const params = {
      client_id: this.clientId,
      sid,
      timestamp,
      redirect_uri: redirectUri,
      sign,
    };
    return `${this.URLS.logout}?${querystring.stringify(params)}`;
  }

  public async getNotice(
    offset = 0,
    limit = 3,
    dateAfter = 0,
  ): Promise<unknown> {
    const params = { offset, limit, date_after: dateAfter };
    const response = await axios.get(this.URLS.notice, { params });
    return response.data;
  }

  public parseUnregisterRequest(data: Record<string, string>): string {
    const clientId = data.clietn_id || ""; // typo might be on purpose from server
    const sid = data.sid || "";
    const timestamp = data.timestamp || "";
    const sign = data.sign || "";

    if (
      clientId !== this.clientId ||
      !this.validateSign([sid], timestamp, sign)
    ) {
      throw new Error("INVALID_REQUEST");
    }

    return sid;
  }
}

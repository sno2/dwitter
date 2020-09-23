import { buildUrl } from "https://deno.land/x/url_builder@v1.0.0/mod.ts";
import type { DwitterAuth } from "./models/dwitter_auth.ts";
import type {
  HideRepliesResponseData,
  ResponseData,
  TweetResponseData,
  TweetsResponseData,
  TweetsSearchResponseData,
  UserResponseData,
  UsersResponseData,
} from "./models/responses/mod.ts";

// TODO: JSDocs
// TODO: Add `RequestFields` interface

export class Dwitter {
  private keys: DwitterAuth;
  private static baseUrl = "https://api.twitter.com/2";

  constructor(credentials: DwitterAuth) {
    this.keys = credentials;
  }

  public async getTweet(id: string, fields?: any): Promise<TweetResponseData> {
    const reqUrl = buildUrl(Dwitter.baseUrl, {
      path: ["tweets", id],
      queryParams: fields,
    });

    const res = await this.apiRequest(reqUrl);

    return res;
  }

  public async getTweets(
    ids: string[],
    fields?: any
  ): Promise<TweetsResponseData> {
    const reqUrl = buildUrl(Dwitter.baseUrl, {
      path: "tweets",
      queryParams: {
        ids: ids.join(","),
        ...fields,
      },
    });

    const res = await this.apiRequest(reqUrl);

    return res;
  }

  public async getUserById(
    id: string,
    fields?: any
  ): Promise<UserResponseData> {
    const reqUrl = buildUrl(Dwitter.baseUrl, {
      path: ["users", id],
      queryParams: fields,
    });

    const res = await this.apiRequest(reqUrl);

    return res;
  }

  public async getUserByName(
    name: string,
    fields?: any
  ): Promise<UserResponseData> {
    const reqUrl = buildUrl(Dwitter.baseUrl, {
      path: ["users", "by", "username", name],
      queryParams: fields,
    });

    const res = await this.apiRequest(reqUrl);

    return res;
  }

  public async getUsersById(
    ids: string[],
    fields?: any
  ): Promise<UsersResponseData> {
    const reqUrl = buildUrl(Dwitter.baseUrl, {
      path: "users",
      queryParams: {
        ids: ids.join(","),
        ...fields,
      },
    });

    const res = await this.apiRequest(reqUrl);

    return res;
  }

  public async searchRecentTweets(
    query: string,
    fields?: any
  ): Promise<TweetsSearchResponseData> {
    const reqUrl = buildUrl(Dwitter.baseUrl, {
      path: ["tweets", "search", "recent"],
      queryParams: {
        query,
        ...fields,
      },
    });

    const res = await this.apiRequest(reqUrl);

    return res;
  }

  public async setTweetReplyViewStatus(
    id: string,
    newStatus: boolean, // true = hidden; false = not hidden;
    oauth: string
  ): Promise<HideRepliesResponseData> {
    const reqUrl = buildUrl(Dwitter.baseUrl, {
      path: ["tweets", id, "hidden"],
    });

    const res = await this.apiRequest(reqUrl, {
      authorization: `OAuth ${oauth}`,
      json: { data: { hidden: newStatus } },
    });

    return res;
  }

  public async hideTweetReply(
    id: string,
    oauth: string
  ): Promise<HideRepliesResponseData> {
    return await this.setTweetReplyViewStatus(id, true, oauth);
  }

  public async showTweetReply(
    id: string,
    oauth: string
  ): Promise<HideRepliesResponseData> {
    return await this.setTweetReplyViewStatus(id, false, oauth);
  }

  public async apiRequest(
    reqUrl: string,
    options?: {
      authorization?: string;
      json?: any;
      type?: "GET" | "PUT" | "POST";
    }
  ) {
    const req = await fetch(reqUrl, {
      method: options?.type || "GET",
      body: options?.json ? JSON.stringify(options.json) : null,
      headers: {
        authorization:
          options?.authorization || `Bearer ${this.keys.bearerToken}`,
      },
    });

    const res = await req.json();

    Dwitter.handleResponseError(res);

    return await res;
  }

  private static handleResponseError(res: ResponseData): void {
    if (!res.data || res.errors) {
      // They have two error types
      if (res.title === "Invalid Request") {
        for (const { message } of res.errors) {
          console.error(`${res.title} Error: ${message}`);
        }
      } else {
        for (const { title, message } of res.errors) {
          console.error(`${title} Error: ${message}`);
        }
      }

      if (res.type) {
        console.error(`Learn more at ${res.type}`);
      }
    }
  }

  // TODO: Good method for logging errors for *all* types of Twitter API requests.
}

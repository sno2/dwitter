import { buildUrl } from "https://deno.land/x/url_builder@v1.0.0/mod.ts";
import type { DwitterAuth } from "./models/dwitter_auth.ts";
import type {
  HideRepliesResponseData,
  ResponseData,
  StreamRulesResponseData,
  TweetResponseData,
  TweetsResponseData,
  TweetsSearchResponseData,
  UserResponseData,
  UsersResponseData,
} from "./models/responses/mod.ts";

// TODO: JSDocs
// TODO: Add `RequestFields` interface
// TODO: Add optional oauth parameters for supported methods
// TODO: Sort methods by the following ruleset: (public > private > static with all alphabetized)
// TODO: Create a `TweetStream` class and and abstract out some of the ugly stream stuff with events & callbacks

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

  public async getUsersByIds(
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

  public async getRecentTweetsByQuery(
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

  public getTweetsStream(fields?: any) {
    // returns request to be used as a stream
    const reqUrl = buildUrl(Dwitter.baseUrl, {
      path: ["tweets", "sample", "stream"],
      queryParams: { ...fields },
    });

    return this.apiRequest(reqUrl, { sync: true });
  }

  // TODO: Add return type
  public getFilteredTweetsStream(fields?: any) {
    // returns request to be used as a stream
    const reqUrl = buildUrl(Dwitter.baseUrl, {
      path: ["tweets", "search", "stream"],
      queryParams: { ...fields },
    });

    return this.apiRequest(reqUrl, { sync: true });
  }

  public async getFilteredTweetsStreamRules(
    ids?: string[]
  ): Promise<StreamRulesResponseData> {
    const reqUrl = buildUrl(Dwitter.baseUrl, {
      path: ["tweets", "search", "stream", "rules"],
      queryParams: { ids: ids || [] },
    });

    const res = await this.apiRequest(reqUrl);

    return res;
  }

  public async addFilteredTweetsStreamRules(
    rules: { value: string; tag: string }[],
    dryRun?: boolean
  ): Promise<StreamRulesResponseData> {
    const reqUrl = buildUrl(Dwitter.baseUrl, {
      path: ["tweets", "search", "stream", "rules"],
      queryParams: {
        dry_run: dryRun?.toString() || false.toString(),
      },
    });

    const res = await this.apiRequest(reqUrl, {
      json: { add: rules },
      type: "POST",
    });

    return res;
  }

  // TODO: Make sure this actually works because the Twitter Dev response does not really say anything
  public async deleteFilteredTweetsStreamRules(
    ids: string[],
    dryRun?: boolean
  ): Promise<StreamRulesResponseData> {
    const reqUrl = buildUrl(Dwitter.baseUrl, {
      path: ["tweets", "search", "stream", "rules"],
      queryParams: {
        dry_run: dryRun?.toString() || false.toString(),
      },
    });

    const res = await this.apiRequest(reqUrl, {
      json: { delete: { ids: ids } },
      type: "POST",
    });

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
      type: "POST",
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
      sync?: boolean;
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

    if (options?.sync === true) {
      return req;
    } else {
      const res = await req.json();

      Dwitter.handleResponseError(res);

      return await res;
    }
  }

  private static handleResponseError(res: ResponseData): void {
    if (res.errors) {
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
    } else if (res.status === 405) {
      console.error(
        `Auth Error: One of the methods you tried to perform were not correctly authenticated. Did you try to use your Bearer Token instead of a User Context OAuth key?`
      );
    }
  }

  // TODO: Good method for logging errors for *all* types of Twitter API requests.
}

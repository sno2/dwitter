import { buildUrl } from "https://deno.land/x/url_builder@v1.0.0/mod.ts";
import type { DwitterAuth } from "./models/dwitter_auth.ts";
import type {
  TweetResponseData,
  TweetsResponseData,
  UserResponseData,
  UsersResponseData,
} from "./models/responses/mod.ts";

// TODO: JSDocs

export class Dwitter {
  private keys: DwitterAuth;
  private static baseUrl = "https://api.twitter.com/2";
  private fetchHeaders: Headers;

  constructor(credentials: DwitterAuth) {
    this.keys = credentials;
    this.fetchHeaders = new Headers();
    this.fetchHeaders.set("authorization", `Bearer ${this.keys.bearerToken}`);
  }

  public async getTweet(id: string, options?: any): Promise<TweetResponseData> {
    const reqUrl = buildUrl(Dwitter.baseUrl, {
      path: ["tweets", id],
      queryParams: options,
    });

    const res = await this.apiRequest(reqUrl);

    return res;
  }

  public async getTweets(
    ids: string[],
    globalOptions?: any
  ): Promise<TweetsResponseData> {
    const reqUrl = buildUrl(Dwitter.baseUrl, {
      path: "tweets",
      queryParams: {
        ids: ids.join(","),
        ...globalOptions,
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

  public async apiRequest(reqUrl: string) {
    const req = await fetch(reqUrl, {
      headers: this.fetchHeaders,
    });

    const res = await req.json();

    if (!res.data || res.errors) {
      for (const error of res.errors) {
        if (error.message) {
          console.error(`Unregistered Error: ${error.message}`);
        } else if (error.title === "Field Authorization Error") {
          console.error(
            `Auth Error: The tokens provided do not have access to the '${error.field}' field provided on the '${error.resource_type}' with an id of '${error.value}'.`
          );
        }
      }
    }

    return await res;
  }

  // TODO: Good method for logging errors for *all* types of Twitter API requests.
}

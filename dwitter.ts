import { APIKeys } from "./api_keys.ts";
import { Tweet } from "./tweet.ts";
import { urlWithParams } from "./url_with_params.ts";

export class Dwitter {
  private keys: APIKeys;
  private baseUrl: string;
  private fetchHeaders: Headers;

  constructor(credentials: APIKeys) {
    this.baseUrl = "https://api.twitter.com/2";
    this.keys = credentials;

    Dwitter.checkHasKey(
      this.keys.bearerToken,
      "bearerToken",
      "All API Requests"
    );

    this.fetchHeaders = new Headers();
    this.fetchHeaders.set("authorization", `Bearer ${this.keys.bearerToken}`);
  }

  static checkHasKey(
    key: string | undefined,
    keyName: string,
    keyUsage: string
  ) {
    if (!key) {
      console.log(
        `Auth Error: '${keyName}' is a required API key for ${keyUsage}.`
      );

      Deno.exit(0);
    }
  }

  async getTweet(id: string, options?: any) {
    const reqUrl = urlWithParams(`${this.baseUrl}/tweets/${id}`, options || {});

    const res = await fetch(reqUrl, {
      headers: this.fetchHeaders,
    });

    const { errors, data: tweet } = await res.json();

    return tweet;
  }

  async getTweets(ids: string[], options?: any) {
    const reqUrl = urlWithParams(`${this.baseUrl}/tweets`, {
      ids: ids.join(","),
      ...options,
    });

    const res = await fetch(reqUrl, {
      headers: this.fetchHeaders,
    });

    const { errors, data: tweets } = await res.json();

    return tweets;
  }
}

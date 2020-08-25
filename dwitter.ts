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
      "all API requests"
    );

    this.fetchHeaders = new Headers();
    this.fetchHeaders.set("authorization", `Bearer ${this.keys.bearerToken}`);
  }

  static logErrorsResponse({ errors, title, detail, type }: any) {
    if (errors) {
      console.log(`${title} Error: ${detail} (see ${type})`);

      for (const { message, parameters } of errors) {
        console.log(`\n${message}`);
      }
    }
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

    const response = await res.json();

    Dwitter.logErrorsResponse(response);

    return response.data;
  }

  async getTweets(ids: string[] | any[], globalOptions?: any) {
    // TODO: Optimizitations

    let areAllStrings = true;

    for (const id of ids) {
      if (id.constructor !== String) {
        areAllStrings = false;
        break;
      }
    }

    if (areAllStrings) {
      const reqUrl = urlWithParams(`${this.baseUrl}/tweets`, {
        ids: ids.join(","),
        ...globalOptions,
      });

      const res = await fetch(reqUrl, {
        headers: this.fetchHeaders,
      });

      const response = await res.json();

      Dwitter.logErrorsResponse(response);

      return response.data;
    } else {
      const tweets = [];

      for (const tweet of ids) {
        let toPush: any;

        if (tweet.constructor === String) {
          toPush = await this.getTweet(<string>tweet, globalOptions);
        } else {
          const { id, options } = tweet;

          // TODO: Fix `globalOptions`'s keys overriding regular `options`'s keys.

          toPush = await this.getTweet(id, { ...options, ...globalOptions });
        }

        tweets.push(toPush);
      }

      return tweets;
    }
  }
}

import { APIKeys } from "./api_keys.ts";
import { Tweet } from "./tweet.ts";
import { urlWithParams } from "./url_with_params.ts";

export class Dwitter {
  private keys: APIKeys;
  private baseUrl = "https://api.twitter.com/2";

  constructor(credentials: APIKeys) {
    this.keys = credentials;
  }

  checkHasKey(key: string | undefined, keyName: string, keyUsage: string) {
    if (!key) {
      console.log(
        `Auth Error: '${keyName}' is a required API key for ${keyUsage}.`
      );

      Deno.exit(0);
    }
  }

  async getTweet(id: string, options?: any) {
    this.checkHasKey(this.keys.bearerToken, "bearerToken", "getting tweets");

    let reqUrl = `${this.baseUrl}/tweets/${id}`;

    if (options) {
      reqUrl = urlWithParams(reqUrl, options);
    }

    const res = await fetch(reqUrl, {
      headers: {
        authorization: `Bearer ${this.keys.bearerToken}`,
      },
    });

    const tweet = await res.json();

    if (tweet.errors) {
      for (const err of tweet.errors) {
        console.error(`${err.title}: ${err.detail}`);
      }

      Deno.exit(0);
    }

    return tweet.data;
  }

  async getTweets(ids: string[], options?: any) {
    this.checkHasKey(
      this.keys.bearerToken,
      "bearerToken",
      "getting multiple tweets"
    );

    let reqUrl = `${this.baseUrl}/tweets`;

    reqUrl = urlWithParams(reqUrl, {
      ids: ids.join(","),
    });

    if (options) {
      reqUrl = urlWithParams(reqUrl, options);
    }

    const res = await fetch(reqUrl, {
      headers: {
        authorization: `Bearer ${this.keys.bearerToken}`,
      },
    });

    const tweets = await res.json();

    if (tweets.errors) {
      console.log(tweets);
      Deno.exit(0);
    }

    return tweets.data;
  }
}

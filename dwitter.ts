import { APIKeys } from "./api_keys.ts";
import { Tweet } from "./tweet.ts";
import { urlWithParams } from "./url_with_params.ts";

export class Dwitter {
  private key: string;
  private secret: string;
  private token: string;
  private baseUrl = "https://api.twitter.com/2";

  constructor(credentials: APIKeys) {
    this.key = credentials.key;
    this.secret = credentials.secret;
    this.token = credentials.token;
  }

  async getTweet(id: string, options?: any) {
    let reqUrl = `${this.baseUrl}/tweets/${id}`;

    if (options) {
      reqUrl = urlWithParams(reqUrl, options);
    }

    const res = await fetch(reqUrl, {
      headers: {
        authorization: `Bearer ${this.token}`,
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
    const tweets = [];

    for (const id of ids) {
      tweets.push(await this.getTweet(id, options));
    }

    return tweets;
  }
}

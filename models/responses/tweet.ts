import type { ResponseData } from "./mod.ts";
import type { TweetData } from "../tweet/mod.ts";

export interface TweetResponseData extends ResponseData {
  data: TweetData;
}

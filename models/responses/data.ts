import type { IncludesData } from "../includes/mod.ts";
import type { TweetData } from "../tweet/mod.ts";
import type { UserData } from "../user/mod.ts";

// TODO: fix `any` type!!!

export interface ResponseData {
  errors?: any;
  data?: TweetData | TweetData[] | UserData | UserData[];
  includes?: IncludesData;
}

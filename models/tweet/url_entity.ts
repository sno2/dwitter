import type { UrlEntity } from "../globals/mod.ts";

export interface TweetUrlEntity extends UrlEntity {
  title: string;
  description: string; // TODO: make sure this property is always there when there is a URL
  unwound_url: string;
}

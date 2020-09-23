import type { TagEntity } from "../globals/mod.ts";
import type { TweetAnnotationEntity, TweetUrlEntity } from "./mod.ts";

export interface TweetEntities {
  annotations?: TweetAnnotationEntity[];
  cashtags?: TagEntity[];
  hashtags?: TagEntity[];
  mentions?: TagEntity[];
  urls?: TweetUrlEntity[];
}

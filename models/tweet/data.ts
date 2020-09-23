// Refer to https://developer.twitter.com/en/docs/twitter-api/data-dictionary/object-model/tweet

import {
  TweetAttachments,
  TweetContextAnnotation,
  TweetEntities,
  TweetGeo,
  TweetNonPublicMetrics,
  TweetOrganicMetrics,
  TweetPromotedMetrics,
  TweetPublicMetrics,
  TweetReferencedTweet,
  TweetWithheld,
} from "./mod.ts";

export interface TweetData {
  id: string;
  text: string;
  attachments?: TweetAttachments;
  author_id?: string;
  context_annotations?: TweetContextAnnotation[];
  conversation_id?: string;
  created_at?: string;
  entities?: TweetEntities;
  geo?: TweetGeo;
  in_reply_to_user_id?: string;
  lang?: string; // TODO: include all lang values in union
  non_public_metrics?: TweetNonPublicMetrics;
  // This one's not like the other metrics :(
  organic_metrics?: TweetOrganicMetrics;
  possibly_sensitive?: boolean;
  promoted_metrics?: TweetPromotedMetrics;
  public_metrics?: TweetPublicMetrics;
  referenced_tweets?: TweetReferencedTweet[];
  source?: string;
  withheld?: TweetWithheld;
}

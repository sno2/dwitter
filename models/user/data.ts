// Refer to https://developer.twitter.com/en/docs/twitter-api/data-dictionary/object-model/user

import type { UserEntities } from "./entities.ts";
import type { UserPublicMetrics } from "./public_metrics.ts";

export interface UserData {
  id: string;
  name: string;
  username: string;
  created_at?: string;
  description?: string;
  entities?: UserEntities;
  location?: string;
  pinned_tweet_id?: string;
  profile_image_url?: string;
  protected?: boolean;
  public_metrics?: UserPublicMetrics;
}

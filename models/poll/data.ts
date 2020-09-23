// Refer to https://developer.twitter.com/en/docs/twitter-api/data-dictionary/object-model/poll

import type { PollOption } from "./mod.ts";

export interface PollData {
  id: string;
  options: PollOption[];
  duration_minutes?: number;
  end_datetime?: string;
  voting_status?: string; // TODO: use "active" | "closed" (idk what all of the `voting_status` values are)
}

// Refer to https://developer.twitter.com/en/docs/twitter-api/data-dictionary/object-model/media

import type {
  MediaAllMetrics,
  MediaPlaybackMetrics,
  MediaViewMetrics,
} from "./mod.ts";

export class MediaData {
  media_key: string;
  type: "animated_gif" | "photo" | "video";
  duration_ms?: number;
  width?: number;
  non_public_metrics?: MediaPlaybackMetrics;
  organic_metrics?: MediaAllMetrics;
  preview_image_url?: string;
  promoted_metrics?: MediaAllMetrics;
  public_metrics?: MediaViewMetrics;
  height?: number;
}

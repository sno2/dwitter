import type { MediaPlaybackMetrics, MediaViewMetrics } from "./mod.ts";

export interface MediaAllMetrics
  extends MediaViewMetrics,
    MediaPlaybackMetrics {}

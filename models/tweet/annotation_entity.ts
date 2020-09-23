import type { Entity } from "../globals/mod.ts";

export interface TweetAnnotationEntity extends Entity {
  start: number;
  end: number;
  probability: number;
  type: string; // TODO: include all type values in union
  normalized_text: string;
}

import type { Entity } from "./mod.ts";

export interface UrlEntity extends Entity {
  url: string;
  expanded_url: string;
  display_url: string;
}

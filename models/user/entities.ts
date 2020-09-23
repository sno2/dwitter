import type { TagEntity, UrlEntity } from "../globals/mod.ts";

export interface UserEntities {
  url: {
    urls: UrlEntity[];
    description: {
      urls: UrlEntity[];
      hashtags: TagEntity[];
      mentions: TagEntity[];
      cashtags: TagEntity[];
    };
  };
}

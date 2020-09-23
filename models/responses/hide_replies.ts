import type { ResponseData } from "./mod.ts";

export interface HideRepliesResponseData extends ResponseData {
  data: {
    hidden: boolean;
  };
}

import type { ResponseData } from "./mod.ts";
import type { StreamRuleData } from "../stream/mod.ts";

export interface StreamRulesResponseData extends ResponseData {
  data?: StreamRuleData[];
}

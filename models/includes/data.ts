import type { PlaceData } from "../place/mod.ts";
import type { UserData } from "../user/mod.ts";

// May need more properties these are the only ones I could find
export interface IncludesData {
  places?: PlaceData[];
  users?: UserData[];
}

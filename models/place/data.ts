// Refer to https://developer.twitter.com/en/docs/twitter-api/data-dictionary/object-model/place

import type { PlaceGeo } from "./mod.ts";

export interface PlaceData {
  full_name: string;
  id: string;
  contained_within?: string[];
  country?: string;
  country_code?: string;
  geo?: PlaceGeo; // please help with the `PlaceGeo` interface
  name?: string;
  place_type?: string; // TODO: use unions with all possible values
}

import type { ResponseData } from "./mod.ts";
import type { UserData } from "../user/mod.ts";

export interface UserResponseData extends ResponseData {
  data: UserData;
}

import type { IncludesData } from "../includes/mod.ts";

// TODO: fix `any` types!!!

export interface ResponseData {
  errors?: any;
  data?: any; // this should be any because this class is extended
  includes?: IncludesData;
  meta?: any;
  title?: string;
  detail?: string;
  type?: string;
}

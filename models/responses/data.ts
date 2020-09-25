import type { IncludesData } from "../includes/mod.ts";

// TODO: fix `any` types!!!

export interface ResponseData {
  errors?: any;
  data?: any; // this should be any because this class is extended
  includes?: IncludesData;
  meta?: {
    sent: string;
    summary?: {
      created?: number;
      deleted?: number;
      not_created?: number;
      not_deleted?: number;
    };
  };
  status?: number;
  title?: string;
  detail?: string;
  type?: string;
}

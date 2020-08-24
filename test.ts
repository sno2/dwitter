import { config } from "https://deno.land/x/dotenv/mod.ts";
import { Dwitter } from "./mod.ts";

const twitterAPIKeys = config({ path: "./.twitter.env" });

const dwitter = new Dwitter(twitterAPIKeys);

console.log(await dwitter.getTweet("1275456813354401794"));

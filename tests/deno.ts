/*
  Run `deno test --allow-read --allow-net deno.ts` in this folder (master/test) to run tests
*/

import { config } from "https://deno.land/x/dotenv/mod.ts";
import { Dwitter } from "../mod.ts";
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

const twitterAPIKeys = config({
  path: "./.twitter.env",
});

const dwitter = new Dwitter(twitterAPIKeys);

Deno.test("Dwitter.getTweet()", async function () {
  const tweet = await dwitter.getTweet("1297887314895675393");

  const correctTweet = {
    id: "1297887314895675393",
    text: "A lil test tweet for a Deno module I'm working on...",
  };

  assertEquals(tweet, correctTweet);
});

Deno.test("Dwitter.getTweets()", async function () {
  const tweets = await dwitter.getTweets([
    "1297887314895675393",
    "1297888065764171776",
  ]);

  const correctTweets = [
    {
      id: "1297887314895675393",
      text: "A lil test tweet for a Deno module I'm working on...",
    },
    {
      id: "1297888065764171776",
      text: "A second lil test tweet for a Deno module I'm working on...",
    },
  ];

  assertEquals(tweets, correctTweets);
});

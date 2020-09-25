# dwitter

A [Deno](https://deno.land) module to use the new [Twitter Developer API v2](https://developer.twitter.com/en/docs/twitter-api/early-access)!

## Module Installation

To use Dwitter, make sure that you have Deno installed. If you don't, make sure you go to the [Deno installation page](https://deno.land/#installation) and follow those steps. After that, you can import and use Dwitter via the following code:

```ts
import { Dwitter } from "https://deno.land/x/dwitter/mod.ts";
```

## Usage

Here is an example usage of the dwitter module which would log out some data about a tweet:

```ts
import { config } from "https://deno.land/x/dotenv/mod.ts";
import { Dwitter } from "https://deno.land/x/dwitter/mod.ts";

const { bearerToken } = config({ path: "./.twitter.env" });

const dwitter = new Dwitter(bearerToken);

const myTweet = await dwitter.getTweet("1297888065764171776");

console.log(myTweet);
```

The above code would log out the following to the console:

```sh
{
  data: {
    id: "1297888065764171776",
    text: "A second lil test tweet for a Deno module I'm working on..."
  }
}
```

As you can see, Dwitter returns the data in the same format that the Twitter API v2 does. For simplicity, we aren't going to be including the setup code in the following examples.

If you need to get more data about the tweets, you don't even need to worry about working with janky url parameters (yes, I just said janky). Include all of the request fields as the second parameter of supported methods, and Dwitter will just return your data like magic!

```ts
await dwitter.getTweet("1297888065764171776", {
  "tweet.fields": ["author_id"],
});
```

```sh
{
  data: {
    author_id: "1155201433261805570",
    id: "1297888065764171776",
    text: "A second lil test tweet for a Deno module I'm working on..."
  }
}
```

Now, you may be thinking, does this mean that I can query any field on any of my requests? Your answer to that question is yes. Very much so yes. Here is how I can get some of the user data and expansions of tweets:

```ts
await dwitter.getTweet("1297888065764171776", {
  "tweet.fields": ["public_metrics"],
  "user.fields": ["pinned_tweet_id"],
  expansions: ["author_id"],
});
```

```sh
{
  data: {
    author_id: "1155201433261805570",
    text: "A second lil test tweet for a Deno module I'm working on...",
    public_metrics: { retweet_count: 0, reply_count: 0, like_count: 1, quote_count: 0 },
    id: "1297888065764171776"
  },
  includes: {
    users: [
      {
        pinned_tweet_id: "1307874778007699456",
        username: "CodingCarter",
        id: "1155201433261805570",
        name: "Carter Snook"
      }
    ]
  }
}
```

As you can see, you can add any of the parameters that are acceptable according the [Twitter API v2 api reference docs](https://developer.twitter.com/en/docs/twitter-api/api-reference-index).

## API

Ok, now that you understand how you can use Dwitter, let's show you all of what it has to offer!

#### `.getTweet(id: string, fields?: any)`

#### `.getTweets(ids: string[], fields?: any)`

#### `.getUserById(id: string, fields?: any)`

#### `.getUserByName(name: string, fields?: any)`

#### `.getUsersByIds(ids: string[], fields?: any)`

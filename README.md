# dwitter

A simple [Deno](https://deno.land) Module to use the new [Twitter Developer API v2](https://developer.twitter.com/en/docs/twitter-api/early-access)!

## Usage

Here is an example usage of the dwitter module:

```ts
import { config } from "https://deno.land/x/dotenv/mod.ts";
import { Dwitter } from "https://deno.land/x/dwitter/mod.ts";

const { bearerToken } = config({ path: "./.twitter.env" });

const dwitter = new Dwitter(bearerToken);

console.log(await dwitter.getTweet("1275456813354401794"));
```

## Module Installation

This is a [Deno](https://deno.land/) module available to import direct from this repo and via the [Deno Third Party Modules index](https://deno.land/x/dwitter).

Before importing, [download and install Deno](https://deno.land/#installation).

You can then import Dwitter straight into your project:

```ts
import { Dwitter } from "https://deno.land/x/dwitter/mod.ts";
```

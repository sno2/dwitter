# dwitter

A simple [Deno](https://deno.land) Module to use the new [Twitter Developer API v2](https://developer.twitter.com/en/docs/twitter-api/early-access)!

## Usage

Here is an example usage of the dwitter module:

```ts
import { config } from "https://deno.land/x/dotenv/mod.ts";
import { Dwitter } from "https://deno.land/x/dwitter/mod.ts";

const twitterAPIKeys = config({ path: "./.twitter.env" });

const dwitter = new Dwitter(twitterAPIKeys);

console.log(await dwitter.getTweet("1275456813354401794"));
```

## Module Installation

This is a [Deno](https://deno.land/) module available to import direct from this repo and via the [Deno Third Party Modules index](https://deno.land/x/dwitter).

Before importing, [download and install Deno](https://deno.land/#installation).

You can then import Minifier straight into your project:

```ts
import { Dwitter } from "https://deno.land/x/dwitter/mod.ts";
```

<!-- ## Docs

## CLI

The Dwitter CLI is still in development, therefore there may be syntax changes and better error support later.

### Installation

If you would like to install the CLI version of Minifier, just clone or download this repository and run the following command inside of your terminal:

```shell
$ deno install --unstable --allow-read --allow-write --name dwitter cli.ts
```

### Commands

Here are all of the commands that you can run and a short description:

| Command | Description |
| ------: | :---------- |
 -->

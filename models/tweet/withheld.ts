export interface TweetWithheld {
  copyright: boolean;
  country_codes: string[]; // Should check to see if country code is one of twitter's valid country codes
  scope?: "tweet" | "user";
}

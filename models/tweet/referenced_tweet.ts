// I hate this name but conventions must be followed
export interface TweetReferencedTweet {
  type: "replied_to" | "quoted"; // I *think* these are all possible values
  id: string;
}

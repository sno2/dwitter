import { Dwitter } from "./mod.ts";

const creds = {
  key: "bLrmYYk2QvzSxeALSte1ksxe6",
  secret: "RVUgxSXkg5LEgZ1zsLtGNkyfSvJdcx2eLh3xgxMRSfVsHi8lY3",
  token:
    "AAAAAAAAAAAAAAAAAAAAAJwJHAEAAAAAus9Jo1TfO93wDZJpaxry1kJV17I%3DBYvnKNY5xtMtVofYgd0SipNooAe1TocjcPe8M0JRcmCnUmFcee",
};

const dwitter = new Dwitter(creds);

const myTweet = await dwitter.getTweets(
  ["1275456813354401794", "1296084384198594561", "1294329715986227203"],
  {
    "tweet.fields": "attachments",
  }
);

console.log(myTweet);

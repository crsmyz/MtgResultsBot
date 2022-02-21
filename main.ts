import { REDDIT_RSS } from "./global_constants";
import Parse from "rss-parser";
import { TwitterApi } from 'twitter-api-v2';
import { checkIfRedditPostMatchesToday } from "./checkIfRedditPostMatchesToday";
import { formatDataForTweet} from "./formatDataForTweet";
import { logWhenTweetIsSuccessful } from "./logWhenTweetIsSuccessful";
import { logNoChanges} from "./logNoChanges";
import { logAndThrowError } from "./logAndThrowError";

const parser: any = new Parse();
const CONSUMER_KEY: string = process.env.BOT_CONSUMER_KEY;
const CONSUMER_SECRET: string = process.env.BOT_CONSUMER_SECRET;
const ACCESS_TOKEN: string = process.env.BOT_ACCESS_TOKEN;
const ACCESS_TOKEN_SECRET: string = process.env.BOT_ACCESS_TOKEN_SECRET;
const client = new TwitterApi({
  appKey: CONSUMER_KEY,
  appSecret: CONSUMER_SECRET,
  accessToken: ACCESS_TOKEN,
  accessSecret: ACCESS_TOKEN_SECRET,
});

(async () => {
    try {
        const resp: any = await parser.parseURL(REDDIT_RSS);
        if (resp && checkIfRedditPostMatchesToday(new Date(resp.items[0].pubDate))) {
          await client.v1.tweet(formatDataForTweet(resp));
          logWhenTweetIsSuccessful();
        } else {
          logNoChanges();
        }
    } catch (error) {
      logAndThrowError(error);
    }
})()
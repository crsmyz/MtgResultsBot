import { REDDIT_RSS, CONSUMER_KEY, CONSUMER_SECRET, ACCESS_TOKEN, ACCESS_TOKEN_SECRET } from "./global_constants";
import Parse from "rss-parser";
import { TwitterApi } from 'twitter-api-v2';
import { checkIfRedditPostMatchesToday } from "./checkIfRedditPostMatchesToday";
import { formatDataForTweet} from "./formatDataForTweet";
import { logWhenTweetIsSuccessful } from "./logWhenTweetIsSuccessful";
import { logNoChanges} from "./logNoChanges";
import { logAndThrowError } from "./logAndThrowError";

const parser: any = new Parse();
const client = new TwitterApi({
  appKey: CONSUMER_KEY,
  appSecret: CONSUMER_SECRET,
  accessToken: ACCESS_TOKEN,
  accessSecret: ACCESS_TOKEN_SECRET,
});

(async () => {
    try {
        const resp: any = await parser.parseURL(REDDIT_RSS);
        const urlId = resp.items[0].link.slice(resp.items[0].link.length-8, resp.items[0].link.length-1);
        const postId: string = resp.items[0].id.slice(resp.items[0].id.length-7);
        const postIsValid: boolean = !(urlId === postId); // post is valid if Ids don't match, this excludes comments from being tweeted and only includes actual result posts
        if (resp &&
            resp.items &&
            checkIfRedditPostMatchesToday(new Date(resp.items[0].pubDate)) &&
            postIsValid) {
            await client.v1.tweet(formatDataForTweet(resp));
            logWhenTweetIsSuccessful();
        } else {
          logNoChanges();
        }
    } catch (error) {
      logAndThrowError(error);
    }
})()
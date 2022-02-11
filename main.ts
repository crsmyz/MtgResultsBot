// dependencies
import Twit from "twit";
// import cheerio from "cheerio";
import axios from 'axios';
import Parse from "rss-parser";

const Twitter = new Twit(
    {
        consumer_key: "123",//process.env.BOT_CONSUMER_KEY,
        consumer_secret: "123", //process.env.BOT_CONSUMER_SECRET,
        access_token: "123", //process.env.BOT_ACCESS_TOKEN,
        access_token_secret: "123" //process.env.BOT_ACCESS_TOKEN_SECRET
    }
);

const parser: any = new Parse();

// get mtg, get images, merge image and tweet: 'bootstrap async function for bot'
(async () => {
    try {
        const resp: any = await parser.parseURL("https://www.reddit.com/user/kronicler1029.rss");
        if (resp && isToday(new Date(resp.items[0].pubDate))) {
            const tweetObj: any = {title: resp.items[0].title.split(' ').slice(2).join(' '), link: resp.items[0].link}
            postToTwitter(tweetObj);
        } else {
            console.log("No Changes");
        }
    } catch (error) {
        console.log("Something went wrong:  |  " + error);
        throw "ERROR:   " + error;
    }
})()

const isToday = (someDate) => {
    console.log(someDate);
    const today = new Date()
    return someDate.getDate() == today.getDate() &&
      someDate.getMonth() == today.getMonth() &&
      someDate.getFullYear() == today.getFullYear()
  }

// post tweet with image and deck data
const postToTwitter = (tweetData) => {
    const tweetStr: string = "New results posted!" + "\n\n" + tweetData.title + '\n' + tweetData.link;
    Twitter.post('status/update', { status: tweetStr }, tweeted);
    // Callback for when the tweet is sent
    function tweeted(err, data, response) {
    if (err) {
      console.log(err);
    } else {
      console.log('Success: ' + data.text);
      console.log(response);
    }
  };
}



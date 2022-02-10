// dependencies
import Twit from "twit";
import cheerio from "cheerio";
import axios from 'axios';

const Twitter = new Twit(
    {
        consumer_key: process.env.BOT_CONSUMER_KEY,
        consumer_secret: process.env.BOT_CONSUMER_SECRET,
        access_token: process.env.BOT_ACCESS_TOKEN,
        access_token_secret: process.env.BOT_ACCESS_TOKEN_SECRET
    }
);

// get mtg, get images, merge image and tweet: 'bootstrap async function for bot'
(async () => {
    try {
        const resp: any = axios.get("https://www.reddit.com/user/kronicler1029/");
        await resp.then(response => {
            const $ = cheerio.load(response.data);
            console.log($);
            let link: any = '';
            // compare dates with the latest post
            postToTwitter(link);
        });
    } catch (error) {
        console.log("Something went wrong:  |  " + error);
        throw "ERROR:   " + error;
    }
})()

// post tweet with image and deck data
const postToTwitter = (link) => {
    const tweetStr: string = "New MTGO legacy results posted!  " + link;
    Twitter.post('status/update', { status: tweetStr }, tweeted);

    // Callback for when the tweet is sent
    function tweeted(err, data, response) {
    if (err) {
      console.log(err);
    } else {
      console.log('Success: ' + data.text);
      //console.log(response);
    }
  };
}



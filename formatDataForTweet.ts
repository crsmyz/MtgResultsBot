export function formatDataForTweet(resp): string {
    const tweetObj: any = {title: resp.items[0].title.split(' ').slice(2).join(' '), link: resp.items[0].link}
    const tweetStr: string = "New results posted!" + "\n\n" + tweetObj.title + '\n' + tweetObj.link;
    return tweetStr;
}
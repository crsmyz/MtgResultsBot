import { TwitterApi } from 'twitter-api-v2';

export async function getOAuthTokenANdSecretAndAuthURL(CONSUMER_KEY: string, CONSUMER_SECRET: string): Promise<any> {
    const client = new TwitterApi({ appKey: CONSUMER_KEY, appSecret: CONSUMER_SECRET });
    const authObj = await client.generateAuthLink();
    return authObj;
}
const Twitter = require('twitter');

const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));

const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

const isDry = process.env.IS_DRY ? process.env.IS_DRY === "true" : false;

// block / unblock all followers
const removeFollowers = async () => {
  const followers = await client.get('followers/ids', { stringify_ids: true });
  console.log('followers.length:', followers.ids.length);
  if (isDry || followers.ids.length === 0) {
    return;
  }

  for (const id of followers.ids) {
    const res1 = await client.post('blocks/create', { user_id: id });
    console.log(`${res1.name}(${res1.id_str}) is blocked.`);
    const res2 = await client.post('blocks/destroy', { user_id: id });
    console.log(`${res2.name}(${res2.id_str}) is unblocked.`);
    await sleep(5000);
  }

  await removeFollowers();
};

// unfollow all remaining friends
const removeFriends = async () => {
  const friends = await client.get('friends/ids', { stringify_ids: true });
  console.log('friends.length:', friends.ids.length);

  if (isDry || friends.ids.length === 0) {
    return;
  }

  for (const id of friends.ids) {
    const res = await client.post('friendships/destroy', { user_id: id });
    console.log(`${res.name}(${res.id_str}) is unfollowed.`);
    await sleep(5000);
  }

  await removeFriends();
}

// delete all tweets
const removeTweets = async (user_id) => {
  const tweets = await client.get('statuses/user_timeline', { user_id, count: 200 });
  console.log('tweets.length:', tweets.length);

  if (isDry || tweets.length === 0) {
    return;
  }

  for (const tweet of tweets) {
    const res = await client.post(`statuses/destroy/${tweet.id_str}`, {});
    console.log(`${res.text}(${res.id_str}) is removed.`);
    await sleep(5000);
  }

  await removeTweets(user_id);
}


const main = async () => {
  const account = await client.get("account/verify_credentials", {});
  console.log(account);

  await removeFollowers();
  await removeFriends();
  await removeTweets(account.id_str);
};

main().catch(e => console.error(e));
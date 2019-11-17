# twitter_cleaner
Remove all tweets and unfollow all followers / followees / tweets from your twitter account.

# usage

To remove followers / followees / tweets, you must give twitter tokens by environment variables.

```sh
TWITTER_CONSUMER_KEY=XXX \
TWITTER_CONSUMER_SECRET=XXX \
TWITTER_ACCESS_TOKEN_KEY=XXX \
TWITTER_ACCESS_TOKEN_SECRET=XXX \
npm start
```

## dry-run

Use `IS_DRY=true` flag to dry-run exection. This mode dont't remove followees, followers and tweets but only display followees / followers / tweets count for remove.

```sh
TWITTER_CONSUMER_KEY=XXX \
TWITTER_CONSUMER_SECRET=XXX \
TWITTER_ACCESS_TOKEN_KEY=XXX \
TWITTER_ACCESS_TOKEN_SECRET=XXX \
IS_DRY=true npm start
```

# License
MIT
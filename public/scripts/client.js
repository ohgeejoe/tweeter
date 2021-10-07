/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
$(document).ready(function() {
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];

  const renderTweets = function(tweets) {
    //might need to clear?
    for (let tweet of tweets) {
      $("#tweets-container").prepend(createTweetElement(tweet));
    }
  };

  // create tweet element Function should take in a tweet object and return formatted HTML to be appended (pushed) onto tweets containter.
  const createTweetElement = function(obj) {
    const $tweet = `
    <article class="tweet-article">
  <header class="tweet">
  <span class="tweet-avatar">
    <img src=${obj.user["avatars"]}>
    <p class="tweet-name profile">${obj.user["name"]}</p>
  </span>
  <p class="tweet-name-handle">${obj.user["handle"]}</p>
  </header>
  <div class="tweet-body">
  <p>
    ${obj.content["text"]}
  </p>
</div>
  
  <footer>
          <p>
          ${timeago.format(obj.created_at)}
          </p>
          <span>
            <i class="fa fa-flag" aria-hidden="true"></i>
            <i class="fa fa-retweet" aria-hidden="true"></i>
            <i class="fa fa-heart" aria-hidden="true"></i>
          </span>
        </footer>
      </article>`;

    return $tweet;
  };
  renderTweets(data);
});



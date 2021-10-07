/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  $("#error-container").hide();
  //AJAX refactor. form id is submit-tweet
  $("#submit-tweet").submit(function(event)   {
    event.preventDefault();
    const serialize = $(this).serialize().slice(29);
    if (serialize.length === 0) {
      $("#error-container").slideDown("slow");
      $(".error-message").text("You didn't write anything!");
    } else if (serialize.length > 140) {
      $("#error-container").slideDown("slow");
      $(".error-message").text("Your tweet is over 140 characters!");
    } else {
      $.ajax({
        method: "POST",
        url: "/tweets",
        data: $("#submit-tweet").serialize(),
      })
        .then(function(response) {
          loadTweets();
          console.log(response);
        });
    }
  });

  //escape function for XSS
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  //function to prepend tweets to tweets container
  const renderTweets = function(tweets) {
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
    ${escape(obj.content["text"])}
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

  //AJAX request to load twists
  const loadTweets = function () {
    $.ajax("/tweets").then(function(results) {
      renderTweets(results);
    });
  };
  loadTweets();
});



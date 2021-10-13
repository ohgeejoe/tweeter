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
    //special characters take up more than one counter.
    const serialize = $(this).serialize().slice(5);
    const textAreaRawLength = $("#tweet-text").val().length;
    if (textAreaRawLength === 0) {
      $("#error-container").slideDown("slow");
      $(".error-message").text("You didn't write anything!");
    } else if (textAreaRawLength > 140) {
      $("#error-container").slideDown("slow");
      $(".error-message").text("Your tweet is over 140 characters!");
    } else {
      $("#error-container").hide();
      $.ajax({
        method: "POST",
        url: "/tweets",
        data: $("#submit-tweet").serialize(),
      })
        .then(function(response) {
          //clear tweet-text textarea, then load
          $("#tweet-text").val("");
          //need to clear counter.
          $(".counter").text(140);
          loadTweets();
        });
    }
  });

  //when nav bar arrow button is pressed, move screen to compose
  $(".toggle-btn").on("click", function() {
    $([document.documentElement, document.body]).animate({
      scrollTop: $(".new-tweet").offset().top
  }, 1000);
});


  //escape function for XSS
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  //function to prepend tweets to tweets container
  const renderTweets = function(tweets) {
    $("#tweets-container").empty();
    for (let tweet of tweets) {
      $("#tweets-container").prepend(createTweetElement(tweet));
    }
  };

  // create tweet element Function should take in a tweet object and return formatted HTML to be appended (pushed) onto tweets containter.
  const createTweetElement = function(obj) {
    //implementing destructing, useful for calling API and getting JSON data
    const {
      user: {avatars,name,handle},
      content: {text},
      created_at}
      = obj;
    const $tweet = `
    <article class="tweet-article">
  <header class="tweet">
  <span class="tweet-avatar">
    <img src=${avatars}>
    <p class="tweet-name profile">${name}</p>
  <p class="tweet-name-handle">${handle}</p>
  </span>
  </header>
  <div class="tweet-body">
  <p>
    ${escape(text)}
  </p>
</div>
  
  <footer>
          <p>
          ${timeago.format(created_at)}
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



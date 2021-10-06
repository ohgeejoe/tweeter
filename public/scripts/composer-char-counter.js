$(document).ready(function() {
  // --- our code goes here ---
  $("#tweet-text").keyup(function() {
    let length = $(this).val().length;
    let counter = 140;
    if (counter - length < 0) {
      $(".counter").css("color", "red");
    } else {
      $(".counter").css("color", "#000000");
    }
    $(".counter").text(counter - length);
  });
});
$(() => {
  loadTweets();

  function renderTweets(data) {
    data.forEach(function (i) {
      const $eachTweet = createTweetElement(i);
      $('#tweets-container').prepend($eachTweet);
    })
  }

  // renderTweets(data);

  function createTweetElement(data) {
    const $makeArticle = $(`<article>`).addClass('tweet'); // make empty article
    const $makeHeader = $(`<header>`).appendTo($makeArticle).addClass('tweet-header'); // make header
    const $addDP = $(`<img>`).prop(`src`, data.user.avatars.small).appendTo($makeHeader); //  add icon to header
    const $addName = $(`<h2>`).text(data.user.name).appendTo($makeHeader); // add name to header
    const $addHandle = $(`<span>`).text(data.user.handle).appendTo($makeHeader); // add handle to header
    // add tweet content
    const $tweetContent = $(`<p>`).text(data.content.text).addClass('tweet-content').appendTo($makeArticle);
    // add footer
    const $makeFooter = $(`<footer>`).text(data.created_at).appendTo($makeArticle).addClass('tweet-footer');
    const $addIcons = $(`<div>`).appendTo($makeFooter).addClass('icons'); // add div for icons
    const $addFlagIcon = $(`<i class="fas fa-flag"></i>`).appendTo($addIcons); // add each icon
    const $addRetweetIcon = $(`<i class="fas fa-retweet"></i>`).appendTo($addIcons);
    const $addHeartIcon = $(`<i class="fas fa-heart"></i>`).appendTo($addIcons);

    return $makeArticle;
  }

  //  Form Submission Using jQuery/AJAX
  $('.tweet-form').submit(function (event) {
    event.preventDefault();
    $.ajax({
      type: 'POST',
      url: '/tweets',
      data: $('.tweet-form').serialize(),
    })
    .then(function (data) {
      loadTweets(); // callback function - asynchronous. need to call this function to load the tweet
      $('.tweet-form')[0].reset();
    });
  });

  //  Fetching tweets with AJAX
  function loadTweets(event) {
    $.ajax({
      type: 'GET',
      url: '/tweets',
      data: $('.tweet-form').serialize(),
      success: function (results) {
        renderTweets(results);
      },
      error: function (err) {
        console.log('Error: Failed to called AJAX', err);
      }
    });
  }

});

$(document).ready(function() {

    const $error = $('div.error')
    const $textArea = $('form textarea')


    //this function escapes any possible html or script which could end up in the DOM
    function escape(text){
        let escaped = $('<div/>').text(text).html()
        return escaped;
    }

    function createTweetElement(tweetDataObject){
        const img = tweetDataObject.user.avatars.small;
        const name = tweetDataObject.user.name;
        const handle = tweetDataObject.user.handle;
        const text = escape(tweetDataObject.content.text);
        const timestamp = $.timeago(tweetDataObject.created_at);

        let $tweet = $('<article>').addClass('tweet');
        $tweet.append(`<header><img src="${img}"><h2>${name}</h2><span class='userID'>${handle}</span></header>`);
        $tweet.append(`<p>${text}</p>`);
        $tweet.append(`<footer>${timestamp}<i class="fas fa-flag"></i><i class="fas fa-retweet"></i><i class="fas fa-thumbs-up"></i></footer></article>`);
        return $tweet;
    }

    function renderTweets(tweets) {
        tweets.reverse().forEach(function(x, i){
            const $tweet = createTweetElement(tweets[i]);
            $('section.tweets-container').append($tweet);
        });
    }

    function loadTweets(){
      $.get('/tweets', (data) => {
        renderTweets(data);
      });
    }

    function clearTweets(){
        $('section.tweets-container').empty();
    }

    function errorUser(message) {
        if ($error.is(":visible")) {
            $error.hide();
        }

        if (!message) {
            $error.text("Nothing to tweet!").slideDown('fast');
            return true;
        } else if (message.length > 140) {
            $error.text("Too much to tweet!").slideDown('fast');
            return true;
        } else {
            return false;
        }
    }

    $('form').on('submit', function(event) {
      event.preventDefault();
      const tweet = $textArea.val()
      const $tweet = $('form').serialize();
        if (errorUser(tweet)) {
        } else {
            $.post('/tweets/', $tweet, function(){
                $textArea.val('');
                $('.new-tweet .counter').text('140');
                clearTweets();
                loadTweets();
                });
        }
    });

    $('#nav-bar .button').on('click', function(event){
        if ($error.is(":visible")) {
            $error.hide();
        }
        if ($('.new-tweet').is(":hidden")) {
            window.scrollTo(0, 0);
        }
        $('.new-tweet').slideToggle('slow');
        $textArea.select();
    })

    loadTweets()
});

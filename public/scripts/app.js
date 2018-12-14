
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
        const $datePosted = $("<p>").addClass("date-posted").text(unixDate(tweet.created_at)).appendTo($footer);

        let $tweet = $('<article>').addClass('tweet');
        $tweet.append(`<header><img src="${img}"><h2>${name}</h2><span class='userID'>${handle}</span></header>`);
        $tweet.append(`<p>${text}</p>`);
        $tweet.append(`<footer>${timestamp}<i class="fas fa-flag"></i><i class="fas fa-retweet"></i><i class="fas fa-thumbs-up"></i></footer></article>`);
        return $tweet;


    }

    function unixDate(digits){
        const daysAgo = Math.floor((Date.now() - digits) / 86400000);
        const hoursAgo = Math.floor((Date.now() - digits) / 3600000);
        const minutesAgo = Math.floor((Date.now() - digits) / 60000);
        if (daysAgo < 2 && hoursAgo < 2 && minutesAgo < 2){
            return "Moments ago.";
        } else if (daysAgo < 2 && hoursAgo < 2){
            return minutesAgo + " minutes ago.";
        } else if (daysAgo < 2 && hoursAgo >= 2){
            return hoursAgo + " hours ago.";
        } else {
            return daysAgo + " days ago";
        }
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
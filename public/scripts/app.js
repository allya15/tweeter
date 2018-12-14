const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
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
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];

$(document).ready(function() {
   //this function escapes any possible html or script which could end up in the DOM
   function escape(text){
       let escaped = $('<div/>').text(text).html()
       return escaped;
   }

   function createTweetElement(tweetDataObject){
       const img = escape(tweetDataObject.user.avatars.small);
       const name = escape(tweetDataObject.user.name);
       const handle = escape(tweetDataObject.user.handle);
       const text = escape(tweetDataObject.content.text);
       const timestamp = escape(tweetDataObject.created_at);
       const daysAgo = 0


       let $tweet = $('<article>').addClass('tweet');
       $tweet.append(`<header><img src="${img}"><h2>${name}</h2><span class='userID'>${handle}</span></header>`);
       $tweet.append(`<p>${text}</p>`);
       $tweet.append(`<footer>${timestamp}<i class="fas fa-flag"></i></footer></article>`);
       return $tweet;
   }

   function renderTweets(tweets) {
       tweets.forEach(function(x, i){
           const $tweet = createTweetElement(tweets[i]);
           $('section.tweets-container').append($tweet);
      });
  }
   function loadTweets(){
    console.log('load the tweets')
    $.get('/tweets', (data) => {
      renderTweets(data);
    });
  }
   function clearTweets(){
    console.log('clear the tweets')
  }
   $('form').on('submit', function(event) {
    event.preventDefault();
    $.post('/tweets/', $('form').serialize());
    clearTweets();
    loadTweets();
  });
});

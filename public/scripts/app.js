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

function renderTweets(data) {
  data.forEach(function (i) {
    const $eachTweet = createTweetElement(i);
    $('#tweets-container').prepend($eachTweet);
  })
}

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

renderTweets(data);

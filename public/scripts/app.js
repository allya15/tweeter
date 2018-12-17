function createTweetElement (tweet){
    var $tweet = $("<article>").addClass("tweet");
    var $header = $("<header>").appendTo($tweet);
    var $avatar = $("<img>").addClass("avatar").attr("src", tweet.user.avatars.small).appendTo($header);
    var $name = $("<h2>").text(tweet.user.name).appendTo($header);
    var $handle = $("<p>").addClass("handle").text(tweet.user.handle).appendTo($header);
    var $content = $("<p>").addClass("content").text(tweet.content.text).appendTo($tweet);
    var $footer = $("<footer>").appendTo($tweet);
    var $datePosted = $("<p>").addClass("date-posted").text(unixDate(tweet.created_at)).appendTo($footer);
    var $socialIcons = $("<div>").addClass("icons").appendTo($footer);
    var $like = $(`<i class="far fa-thumbs-up"></i>`).appendTo($socialIcons);
    var $retweet = $(`<i class="fas fa-retweet"></i>`).appendTo($socialIcons);
    var $flag = $(`<i class="fas fa-flag"></i>`).appendTo($socialIcons);
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

$(document).ready(function() {

    function renderTweets(tweetDataArray){
        tweetDataArray.forEach(function(item) {
            var $tweet = createTweetElement(item);
            $(".all-tweets").prepend($tweet);
        });
    }
    function loadTweets (){
        $.get("/tweets")
            .done(tweets => {
                console.log("Got tweets! Rendering...");
                renderTweets(tweets);
            })
            .fail(() => {
                alert("Error");
            });
    }
    $(function toggleCompose() {
        var $navButton = $("#nav-bar .compose-button");
        $navButton.on("click", function() {
            $(".error-container").slideUp("slow");
            $(".new-tweet-container").slideToggle("slow");
            if ($(".new-tweet-container").is(":visible")){
                $(".container .new-tweet-container .new-tweet .textarea").focus();
            }
        });
    });

    $(function closeError() {
        var $errorButton =  $(".container .new-tweet-container .new-tweet .error-container .error button");
        $errorButton.on("click", function() {
            $(".error-container").slideToggle();
        });
    });

    $('form').on('submit', function(event) {
        event.preventDefault();
        const formContent = $(this).serialize();
        const formLength = $("textarea").val().length;
        function validateForm(){
            if (formLength >= 140){
                $(".error-container").show();
                $(".error-container .error p").text("Your tweet exceeds the maximum number of characters permitted.");
                return false;
            } else if (formLength == 0){
                $(".error-container").show();
                $(".error-container .error p").text("Your tweet is empty.");
                return false;
            } else {
                return true;
            }
        }
        if (validateForm() === false){
            event.stopPropagation();
        } else {
            $.ajax({
                method: 'POST',
                url: '/tweets',
                data: formContent,
                success: function(data){
                    $("form")[0].reset();
                }
            }).then(data => {
                      loadTweets();
                $(".new-tweet .error-container").slideUp();
                $(".new-tweet .textarea").text("");
                $(".counter").text("140");
            },
            (err) => {
                throw err;
                })
            }
    });
})
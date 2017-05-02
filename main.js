$(document).ready(function(){ 
  var $divtweets = $('div.tweets'); 
  var currentUser = "";
  var visitor = '';
  var mostRecentTweet = ""
  var index = streams.home.length - 1; 
  
  //produces all initial tweets
  while(index >= 0){ 
    var tweet = streams.home[index]; 
    var betterDateStart = tweet.created_at.toString().split("GMT").slice(0,1);
    var $tweet = $('<div class="indivTweet '+ tweet.user + '"></div>'); 
    $tweet.html('@<span class="user">' + tweet.user + '</span>: ' + tweet.message + ' <span class="date">' + betterDateStart +'</span>'); 
    $tweet.appendTo($divtweets); 

    index -= 1; 
  }
  
  //allows visitor to click in usernames to display only that username's tweets
  $('.user').on('click', function(){
    var username = $(this).text();
    $('.indivTweet').not('.' + username).hide();
    currentUser = username;
    $('.heading').text('Tweets Yay! [' + username + ']');
  })

  //pulls new tweets and appends them; newest appear at the top.
  var insertNewest = function(){
    //if most recently generated tweet doesn't match the one just posted, post it; else don't.
    if(streams.home[streams.home.length - 1] !== mostRecentTweet){  
      var newestTweet = streams.home[streams.home.length - 1];
      var $tweetDiv = $('<div class="indivTweet '+ newestTweet.user + '"></div>');
      var betterDate = newestTweet.created_at.toString().split("GMT").slice(0,1);

      $tweetDiv.html('@<span class="user">' + newestTweet.user + '</span>: ' + newestTweet.message + ' <span class="date">' + betterDate +'</span>');
      $tweetDiv.prependTo($divtweets);
      
      //assigns class to visitor's tweets so that they display in a different style
      if (visitor === newestTweet.user){
        $tweetDiv.addClass('visitorTweet');
      }

      //after clicking a username, hides all tweets incoming not from that user
      if (currentUser && currentUser !== newestTweet.user){
        ($tweetDiv).hide();
      }

      //removes the oldest tweet when the newest is posted
      $('.tweets div:last').remove(); 
      lastStreamLength = streams.home.length;
      
      //allows visitor to click in usernames to display only that username's tweets; applies this to new tweets;
      $('.user').on('click', function(){
        var username = $(this).text();
        $('.indivTweet').not('.' + username).hide();
        currentUser = username;
        $('.heading').text('Tweets Yay! [' + username + ']');
      })
      //assigns this tweet to the global variable noting the last posted tweet
      mostRecentTweet = streams.home[streams.home.length - 1];
    }
  }

  //button that returns visitor home after clicking a username
  $('.showAll').on('click', function(){
    currentUser = "";
    $('.indivTweet').show();
    $('.heading').text('Tweets Yay!');
  });
  
  //button to post visitor inputted tweet
  $('form').submit(function(){
    visitor = $('[name="visitor"]').val();
    var message = $('[name="message"]').val();
    return writeTweet(visitor, message);
  })
  
  
  //calls the check for newest generated tweets;
  setInterval(insertNewest, 400);
  


});




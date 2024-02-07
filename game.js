buttonColours = ["red","blue","green","yellow"];


var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0;

$(document).keypress(function(){
    if(!started){
        started = true;
        $("h1").text("level " + level);
        nextsequence();
    }
})

$(".btn").click(function() {

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
  
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
});


function nextsequence(){
    userClickedPattern = [];
    level++;
    $("h1").text("Level " + level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

}

function playSound(name){
    var audio = new Audio('sounds/' + name + '.mp3');
    audio.play();
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
        if(gamePattern.length == userClickedPattern.length){
            nextsequence();
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        
        setTimeout(function () {
          $("body").removeClass("game-over");
        }, 200);
  
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

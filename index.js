var blue_sound = new Audio("blue.mp3");
var green_sound = new Audio("green.mp3");
var red_sound = new Audio("red.mp3");
var yellow_sound = new Audio("yellow.mp3");
var wrong_sound = new Audio("wrong.mp3");
var user_history = [];
var computer_history = [];
var userEventClick;
var counter = 0;
var my_interval = null;
var max_score = 0;
removeClick();
addScore();
intervalOn();
$("#menu_div").addClass("addMenuScreen");

function intervalOn() {
    my_interval = setInterval(function() {

    $("#start_button").animate({
      opacity: 0.5
    }, 200).animate({
      opacity: 1
    }, 200);



  }, 1000);


}
function intervalOff(){
  clearInterval(my_interval);

}


$("#red, #blue, #yellow, #green").click(function(event) {

  press(event.target.id);
  user_history.push(event.target.id);
  if (checkUserSuccess()) {
    if (user_history.length === computer_history.length) {
      user_history = [];
      removeClick();
      counter++;
      $("#live_score").html(counter);
      main();
    }
  } else {
    removeClick();
    addScore();
    computer_history = [];
    user_history = [];
    counter = 0;
    $("#live_score").html("");
    $("#play_label").html("ניסיון נוסף ↺");
    intervalOn();
    setTimeout(function() {
      gameOver();
    }, 150);
  }


});

$("#start_button").click(function() {
  $("#menu_div").css("display", "none");
  $("#live_score").html(counter);
  main();
  intervalOff();
});

function main() {
  if (computer_history.length === 0) {
    var startColor = getRandomColor();
    press(startColor);
    computer_history.push(startColor);
    allowClick();
  } else {
    rollBack();
  }
}

function gameOver() {
  wrong_sound.play();
  $("#menu_div").css("display", "block");
}

function checkUserSuccess() {

  for (var i = 0; i < user_history.length; i++) {
    if (user_history[i] !== computer_history[i]) {
      return false;
    }
  }
  return true;
}

function rollBack() {
  var second = 1;
  for (var i = 0; i < computer_history.length; i++) {
    if (computer_history[i] === "red") {
      setTimeout(function() {
        press("red");
      }, second * 700);
    } else if (computer_history[i] === "green") {
      setTimeout(function() {
        press("green");
      }, second * 700)
    } else if (computer_history[i] === "blue") {
      setTimeout(function() {
        press("blue");
      }, second * 700)
    } else {
      setTimeout(function() {
        press("yellow");
      }, second * 700)
    }
    second++;
  }
  setTimeout(function() {
    var randomColor = getRandomColor();
    computer_history.push(randomColor);
    press(randomColor);
    allowClick();

  }, second * 700);
}

function getRandomColor() {
  var randomNum = Math.round(Math.random() * 3 + 1);
  switch (randomNum) {
    case 1:
      return "green";
      break;
    case 2:
      return "red";
      break;
    case 3:
      return "yellow";
      break;
    case 4:
      return "blue";
      break;
  }
}

function press(color) {
  switch (color) {
    case "red":
      $("#red").animate({
        opacity: .2
      }, 100).animate({
        opacity: 1
      }, 50);
      red_sound.play();
      break;
    case "blue":
      $("#blue").animate({
        opacity: .2
      }, 100).animate({
        opacity: 1
      }, 50);
      blue_sound.play();
      break;
    case "green":
      $("#green").animate({
        opacity: .2
      }, 100).animate({
        opacity: 1
      }, 50);
      green_sound.play();
      break;
    case "yellow":
      $("#yellow").animate({
        opacity: .2
      }, 100).animate({
        opacity: 1
      }, 50);
      yellow_sound.play();
      break;
  }
}


function allowClick() {
  $("#red, #blue, #yellow, #green").removeClass("removeClick");

}

function removeClick() {
  $("#red, #blue, #yellow, #green").addClass("removeClick");
}

function addScore() {
  if(counter>=max_score){
    max_score = counter;
    $("#best_score").html(max_score);
  }

}

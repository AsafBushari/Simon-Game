var blue_sound = new Audio("sounds/blue.mp3");
var green_sound = new Audio("sounds/green.mp3");
var red_sound = new Audio("sounds/red.mp3");
var yellow_sound = new Audio("sounds/yellow.mp3");
var wrong_sound = new Audio("sounds/wrong.mp3");
var user_history = [];
var computer_history = [];
var userEventClick;
var counter = 0;
removeClick();
$("#menu_div").addClass("addMenuScreen");
setInterval(  function(){

  $("#start_button").animate({opacity: 0.5},200).animate({opacity:1}, 200);



},1000);

$("#red, #blue, #yellow, #green").click( function(event){

    press(event.target.id);
    user_history.push(event.target.id);
    if(checkUserSuccess()){
      if(user_history.length === computer_history.length){
        user_history = [];
        removeClick();
        counter++;
        main();
      }
    }
    else{
       removeClick();
       addScore();
       computer_history = [];
       user_history = [];
       counter = 0;
       setTimeout(function(){ gameOver(); }, 150);
    }


  });

$("#start_button").click(function(){
  $("#menu_div").css("display","none");
  main();
});

function main(){
    if(computer_history.length === 0){
      var startColor = getRandomColor();
      press(startColor);
      computer_history.push(startColor);
      allowClick();
    }
    else{
      rollBack();
    }
}

function gameOver(){
  wrong_sound.play();
  $("#menu_div").css("display","block");
}

function checkUserSuccess(){

   for(var i=0; i<user_history.length; i++){
     if(user_history[i] !== computer_history[i]){
       return false;
     }
   }
   return true;
}

function rollBack(){
  var second = 1;
  for(var i=0; i<computer_history.length; i++){
    if(computer_history[i] === "red"){
      setTimeout(function(){ press("red"); }, second * 1000);
    }
    else if(computer_history[i] === "green"){
      setTimeout(function(){ press("green"); }, second * 1000)
    }
    else if(computer_history[i] === "blue"){
      setTimeout(function(){ press("blue"); }, second * 1000)
    }
    else{
      setTimeout(function(){ press("yellow"); }, second * 1000)
    }
    second++;
  }
  setTimeout(function(){
      var randomColor = getRandomColor();
      computer_history.push(randomColor);
      press(randomColor);
      allowClick();

   }, second * 1000);
}

function getRandomColor(){
  var randomNum = Math.round(Math.random()*3 +1);
  switch(randomNum){
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

function press(color){
  switch(color){
    case "red":
      $("#red").animate({opacity:.2},200).animate({opacity:1},100);
      red_sound.play();
      break;
    case "blue":
      $("#blue").animate({opacity:.2},200).animate({opacity:1},100);
      blue_sound.play();
      break;
    case "green":
      $("#green").animate({opacity:.2},200).animate({opacity:1},100);
      green_sound.play();
      break;
    case "yellow":
      $("#yellow").animate({opacity:.2},200).animate({opacity:1},100);
      yellow_sound.play();
      break;
  }
}


function allowClick(){
  $("#red, #blue, #yellow, #green").removeClass("removeClick");

 }
function removeClick(){
  $("#red, #blue, #yellow, #green").addClass("removeClick");
}
function addScore(){

  $("#score_table").append("<tr> <td>" + counter + "</td>  </tr>");

}

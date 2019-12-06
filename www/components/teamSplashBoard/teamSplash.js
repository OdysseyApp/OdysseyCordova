function confettiAnimation(colorPlatte){
    // Following code will be executed for page with data-page attribute equal to "about"
    var myCanvas = document.createElement('canvas');
    myCanvas.className="confetti-canvas";
    var bckground = document.getElementsByClassName("team-splash-page");
    bckground[0].append(myCanvas);
    console.log(bckground);
    var myConfetti = confetti.create(myCanvas, { resize: true });


    //Confetti JS Part
 
    var end = Date.now() + (4 * 1000);
    // Confetti Color
  //   var colors = ['#bb0000', '#000000'];
    var colors = colorPlatte;
    
    setTimeout(() => {
        // sound.play();
        (function frame() {
            myConfetti({
                particleCount: 2,
                angle: 60,
                spread: 45,
                origin: {
                    x: 0
                },
                colors: colors
            });
            myConfetti({
                particleCount: 2,
                angle: 120,
                spread: 45,
                origin: {
                    x: 1
                },
                colors: colors
            });
        
            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
      }, 1500);

}

function changeTeamFlag() {
  var teamFlagImage = document.getElementById("assign-flag");
  var teamInfo = document.getElementsByClassName("team-info");
 

  var storage = window.localStorage;
  var teamName = storage.getItem("country");
  
  if(teamName === "South Korea"){
      var colors = ['#332DE7', '#E72D2D'];
      confettiAnimation(colors);
      teamFlagImage.src = "images/south-korea.svg";
      teamInfo[0].innerHTML = "You are in South Korea!";
   
  }
  else if(teamName === "Turkey"){
      var colors = ['#bb0000', '#000000'];
      confettiAnimation(colors);
      teamFlagImage.src = "images/turkey.svg"
      teamInfo[0].innerHTML = "You are in Team Turkey!";
      
  }
  else if(teamName === "Brazil"){
      var colors = ['#F5EF16', '#196F3D'];
      confettiAnimation(colors);
      teamFlagImage.src = "images/brazil.svg"
      teamInfo[0].innerHTML = "You are in Team Brazil!";
      
  }
  else if(teamName === "India"){
      var colors = ['#EE871F', '#196F3D'];
      confettiAnimation(colors);
      teamFlagImage.src = "images/india.svg"
      teamInfo[0].innerHTML = "You are in Team India!";
      
  }
  else if(teamName === "Russia"){
      var colors = ['#332DE7', '#E72D2D'];
      confettiAnimation(colors);
      teamFlagImage.src = "images/russia.svg"
      teamInfo[0].innerHTML = "You are in Team Russia!";
      
  }
}

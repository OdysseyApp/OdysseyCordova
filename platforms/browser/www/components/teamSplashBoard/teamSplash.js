 function confettiAnimation(){
      // Following code will be executed for page with data-page attribute equal to "about"
      var myCanvas = document.createElement('canvas');
        
      myCanvas.className="confetti-canvas";
      var bckground = document.getElementsByClassName("team-screen");
      bckground[0].append(myCanvas);
      console.log(bckground);
      var myConfetti = confetti.create(myCanvas, { resize: true });

      // var sound = new Howl({
      //     src: ['sounds/firework.mp3']
      //   });
      //Confetti JS Part
      var end = Date.now() + (4 * 1000);
      // Confetti Color
      var colors = ['#bb0000', '#000000'];
      
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
 
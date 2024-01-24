window.addEventListener("keydown", checkKeyPressed, false);
function checkKeyPressed(evt) {
  // enter clicked
  if (evt.keyCode == "13") {
    createCandle();
  }
}

function createCandle() {
  var candleCount = 30;
  var cake = document.querySelector(".cake");

  for (var i = 0; i < candleCount; i++) {
    setTimeout(function() {
      var candle = document.createElement("div");
      var flame = document.createElement("div");
      candle.className = "candle";
      flame.className = "flame";
      candle.style.top = Math.random() * 9 + "%";
      candle.style.left = 25 + Math.random() * 360 + "px";
      flame.style.bottom = (i * 100) / (candleCount - 1) + "%";
      cake.appendChild(candle);
      candle.appendChild(flame);
    }, i * 50);  
  }
}


function blowOutFlames(countToBlow) {
const candles = document.querySelectorAll(".candle");

for (let i = 0; i < countToBlow; i++) {
  for (let j = candles.length - 1; j >= 0; j--) {
      const candle = candles[j];
      const flames = candle.querySelectorAll(".flame");

      if (flames.length > 0) {
          const lastFlame = flames[flames.length - 1];
          lastFlame.remove();
          break; 
      }
  }
}
}

navigator.mediaDevices.getUserMedia({ audio: true })
.then((stream) => {
  const audioContext = new AudioContext();
  const analyzer = audioContext.createAnalyser();
  const microphone = audioContext.createMediaStreamSource(stream);
  const scriptProcessor = audioContext.createScriptProcessor(2048, 1, 1);

  microphone.connect(analyzer);
  analyzer.connect(scriptProcessor);
  scriptProcessor.connect(audioContext.destination);

  const loudnessThreshold = 100;

  scriptProcessor.addEventListener("audioprocess", () => {
      const array = new Uint8Array(analyzer.frequencyBinCount);
      analyzer.getByteFrequencyData(array);

      let sum = 0;
      for (let i = 0; i < array.length; i++) {
          sum += array[i];
      }

      const average = sum / array.length;

      if (average > loudnessThreshold) {
          blowOutFlames(2);
      }
  });
})
.catch((error) => {
  console.error("error:", error);
});


// green , grey , blue , black
////////////////// 6 color confetti 
let isMouseDown = false;
const overlay = document.getElementById('overlay');

// let playSong = true;
document.addEventListener('mousedown', function (event) {
  if (overlay.style.opacity !== '0') {
    // overlay.style.opacity = '0';
    // setTimeout(() => {
    //   overlay.style.display = 'none';
    // }, 500);
  }
  isMouseDown = true;
  spawnConfetti(event.clientX, event.clientY);

  // if (playSong) {
  //   var audio = document.getElementById("audio");
  //   audio.play();
  //   playSong = false;
  // }
});

document.addEventListener('mouseup', function () {
  isMouseDown = false;
});

document.addEventListener('mousemove', function (event) {
  if (isMouseDown) {
    spawnConfetti(event.clientX, event.clientY);
  }
});

function spawnConfetti(x, y) {
  for (let i = 0; i < 6; i++) {
    createConfetti(x, y);
  }
}

function createConfetti(x, y) {
  // green , grey , blue , black
  const colors = ['#e74c3c', '#3498db', '#2ecc71', '#f39c12',
    '#9b59b6', '#e67e22', '#000000', '#008000',
    '#A9A9A9', '#0000FF'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  const confetti = document.createElement('div');
  confetti.className = 'confettiSmall';
  confetti.style.backgroundColor = randomColor;
  confetti.style.left = x + 'px';
  confetti.style.top = y + 'px';

  document.getElementsByClassName('bday-cake')[0].appendChild(confetti);

  const angle = Math.random() * Math.PI * 2;
  const velocity = 2 + Math.random() * 2;
  const rotationSpeed = (Math.random() - 0.5) * 10;

  let xVelocity = velocity * Math.cos(angle);
  let yVelocity = velocity * Math.sin(angle);
  const gravity = 0.1;

  function animateConfetti() {
    xVelocity *= 0.99;
    yVelocity += gravity;
    x += xVelocity;
    y += yVelocity;

    const currentRotation = parseFloat(confetti.style.transform.replace('rotate(', '').replace('deg)', '')) || 0;
    confetti.style.transform = `rotate(${currentRotation + rotationSpeed}deg)`;

    confetti.style.left = x + 'px';
    confetti.style.top = y + 'px';

    if (y < window.innerHeight) {
      requestAnimationFrame(animateConfetti);
    } else {
      confetti.remove();
    }
  }

  requestAnimationFrame(animateConfetti);
}
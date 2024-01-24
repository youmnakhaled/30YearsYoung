
///////////////// Confettii 
async function loadParticles(options) {
    await loadAll(tsParticles);
    await tsParticles.load({ id: "tsparticles", options });
}

const configs = {
    name: "Effect Trail",
    particles: {
        number: {
            value: 0
        },
        color: {
            value: {
                h: 60,
                s: 100,
                l: {
                    min: 80,
                    max: 100
                }
            }
        },
        shape: {
            type: "heart"
        },
        size: {
            value: 6
        },
        move: {
            enable: true,
            outModes: "destroy",
            speed: { min: 6, max: 10 }
        }
    },
    background: {
        color: "#000000"
    },
    emitters: {
        rate: {
            quantity: 10,
            delay: 0.3
        },
        size: {
            width: 0,
            height: 0,
            mode: "precise"
        },
        position: {
            x: 50,
            y: 50
        }
    }
};

loadParticles(configs);
//////////////// Router through keyboard
window.addEventListener("keydown", checkKeyPressed, false);

function checkKeyPressed(evt) {
    if (evt.keyCode == "89") {
        // press Y go to next page
        location.href = "cake.html";
    }
}
    

let playSong = true;
document.addEventListener('mousedown', function (event) {
    if (playSong) {
        var audio = document.getElementById("audio");
        
        setTimeout(() => {
        audio.play();
        playSong = false;
        }, 500);
        
    }
});

function close(){
    window.close();
}
// document.addEventListener('mouseup', function () {
//     isMouseDown = false;
// });

// document.addEventListener('mousemove', function (event) {
//     if (isMouseDown) {
//         spawnConfetti(event.clientX, event.clientY);
//     }
// });

// function spawnConfetti(x, y) {
//     for (let i = 0; i < 6; i++) {
//         createConfetti(x, y);
//     }
// }

// function createConfetti(x, y) {
//     const colors = ['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6', '#e67e22'];
//     const randomColor = colors[Math.floor(Math.random() * colors.length)];

//     const confetti = document.createElement('div');
//     confetti.className = 'confettiSmall';
//     confetti.style.backgroundColor = randomColor;
//     confetti.style.left = x + 'px';
//     confetti.style.top = y + 'px';

//     document.body.appendChild(confetti);

//     const angle = Math.random() * Math.PI * 2;
//     const velocity = 2 + Math.random() * 2;
//     const rotationSpeed = (Math.random() - 0.5) * 10;

//     let xVelocity = velocity * Math.cos(angle);
//     let yVelocity = velocity * Math.sin(angle);
//     const gravity = 0.1;

//     function animateConfetti() {
//         xVelocity *= 0.99;
//         yVelocity += gravity;
//         x += xVelocity;
//         y += yVelocity;

//         const currentRotation = parseFloat(confetti.style.transform.replace('rotate(', '').replace('deg)', '')) || 0;
//         confetti.style.transform = `rotate(${currentRotation + rotationSpeed}deg)`;

//         confetti.style.left = x + 'px';
//         confetti.style.top = y + 'px';

//         if (y < window.innerHeight) {
//             requestAnimationFrame(animateConfetti);
//         } else {
//             confetti.remove();
//         }
//     }

//     requestAnimationFrame(animateConfetti);
// }
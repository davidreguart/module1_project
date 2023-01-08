const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const game = new Game(ctx);

let counter = 0;
let pointsCounter = 0;

const btn = document.getElementById("start-btn");
const pnts = document.getElementById("points");

btn.onclick = () => {
    const initialScreen = document.getElementById("initial-screen");
    initialScreen.remove();
    canvas.style.display = 'block';
    pnts.style.display = 'block';
    game.start();

    pointsCounter = setInterval(() => {
        counter++;
        document.getElementById("points").innerHTML = `${counter} puntos`;
    }, 1000)
}


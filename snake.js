let inputDir = { x: 0, y: 0 };
const foodsound = new Audio('food.mp3');
const gameoversound = new Audio('gameover.mp3');
const movesound = new Audio('move.mp3');
const musicsound = new Audio('music.mp3');
let speed = 10;
let score = 0;
let hiscore = 0;

let lastPaintTime = 0;
let snakeArr = [
    { x: 13, y: 15 }
]
food = { x: 6, y: 7 };

// Game Functions
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
    // console.log(ctime)
}

function isCollide(snake) {
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }

    // Hacking the game
    
    // for (let i = 1; i < snakeArr.length; i++) {
    //     if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
    //         return false;
    //     }
    // }
    // if (snake[0].x >= 18) {
    //     snake[0].x = 1;
    // }
    // if (snake[0].x <= 0) {
    //     snake[0].x = 18;
    // }
    // if (snake[0].y >= 18) {
    //     snake[0].y = 1;
    // }
    // if (snake[0].y <= 0) {
    //     snake[0].y = 18;
    // }
}

function gameEngine() {
    // Updating the snake array
    if (isCollide(snakeArr)) {
        gameoversound.play();
        musicsound.pause();
        inputDir = { x: 0, y: 0 };
        alert('Game Over. Play any key to play again');

        snakeArr = [{ x: 13, y: 15 }];
        // musicsound.play();
        score = 0;
        document.getElementById('score').innerHTML = "Score: " + score;
    }

    // If you have eaten the food, increament the score and regenerate the food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodsound.play();
        score += 1;
        if (score > hiscore) {
            hiscore = score;
            hiscorebox.innerHTML = "High Score: " + hiscore;
        } else {
            console.log("nhi jeeta");
        }
        // if (score > hiscoreval) {
        //     hiscoreval = score;
        //     // localStorage.setItem('hiscore', JSON.stringify(hiscoreval));
        //    hiscorebox.innerHTML = "High Score " + hiscoreval;
        // }
        document.getElementById('score').innerHTML = "Score: " + score;
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        let a = 2;
        let b = 17;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
    }

    // Moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // Display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, i) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (i === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    })
    // Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}


// Main Logic

// High Score

// let hiscore = localStorage.getItem("hiscore");
// if(hiscore === null){
//     hiscoreval = 0;
//     localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
// }
// else{
//     hiscoreval = hiscore;
//     hiscoreval = JSON.parse(hiscore);
//     hiscoreBox.innerHTML = "High Score: " + hiscore;
// }

window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 };
    movesound.play();
    switch (e.key) {
        case "ArrowUp":
            // console.log("uppar");
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            // console.log("neeche");
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            // console.log("left");
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            // console.log("right");
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        default:
            break;
    }
})

up.addEventListener('click', () => {
    inputDir.x = 0;
    inputDir.y = -1;
})
down.addEventListener('click', () => {
    inputDir.x = 0;
    inputDir.y = 1;
})
right.addEventListener('click', () => {
    inputDir.x = 1;
    inputDir.y = 0;
})
left.addEventListener('click', () => {
    inputDir.x = -1;
    inputDir.y = 0;
})
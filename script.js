//create board

document.querySelector('.gameover-screen').style.visibility = 'hidden';

let board;
const totalRow = 10;
const totalColumn = 10;

function createBoard() {
    board = [];
    for (let i = 0; i < totalRow; ++i) {
        let row = [];
        for (let j = 0; j < totalColumn; ++j) {
            row.push(0);
            let cell = document.createElement('div');
            cell.classList.add('cell');
            cell.id = i.toString() + j.toString();
            document.getElementById('board').append(cell);
        }
        board.push(row);
    }
}

createBoard();

//place the plane

let planeId = 84;
document.getElementById(planeId).className = 'plane';

//place the objects (birds)

let objectCell;
let objectList = [];
let objectCounter = -3;

function createRandomObjectPosition() {
    objectCell = Math.floor(Math.random() * 10);
    objectList.push('0' + objectCell);
    document.getElementById('0' + objectCell).className = 'object';
    ++objectCounter;
}

//start the game

let movingInterval, crateObjectsInterval;
let timeCounter = 0;


function startGame() {
    createRandomObjectPosition();
    document.addEventListener('keyup', setDirection);
    document.addEventListener('keyup', movePlane);
    movingInterval = setInterval(movingObjectPosition, 1000);
    crateObjectsInterval = setInterval(createRandomObjectPosition, 3000);
}

startGame();

//move the plane

let newPlaneId = planeId;

function setDirection(event) {
    if (event.keyCode == 37) {
        if (newPlaneId > 80 && newPlaneId <= 89) {
            newPlaneId -= 1;
        }
    } else if (event.keyCode == 39) {
        if (newPlaneId >= 80 && newPlaneId < 89) {
            newPlaneId += 1;
        }
    }
}

function movePlane() {
    document.getElementById(planeId).className = 'cell';
    document.getElementById(newPlaneId).className = 'plane';
    planeId = newPlaneId;
}

//moving object

function movingObjectPosition() {
    ++timeCounter;

    for (let i = 0; i < objectList.length; ++i) {
        let newObjectPosition = parseInt(objectList[i]);
        newObjectPosition = newObjectPosition + 10;
        if (newObjectPosition >= 100) {
            document.getElementById(objectList[i]).className = 'cell';
            objectList.splice(newObjectPosition.toString());
        } else {
            document.getElementById(objectList[i]).className = 'cell';
            document.getElementById(newObjectPosition.toString()).className = 'object';
            objectList[i] = newObjectPosition.toString();
        }

        //game over
        if (newObjectPosition == newPlaneId) {
            document.querySelector('.gameover-screen').style.visibility = 'visible';
            document.getElementById('score').innerHTML = 'Your score: '+ timeCounter;
            //document.getElementById('score').innerHTML = 'Your score: '+ objectCounter; - BONUS 1
            clearInterval(movingInterval);
            clearInterval(crateObjectsInterval);
        }
    }
}

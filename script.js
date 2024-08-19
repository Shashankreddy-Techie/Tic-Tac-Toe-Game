const cells = document.querySelectorAll('.cell');
const titleHeader = document.querySelector('#titleHeader');
const xPlayerDisplay = document.querySelector('#xPlayerDisplay');
const oPlayerDisplay = document.querySelector('#oPlayerDisplay');
const restartBtn = document.querySelector('#restartBtn');

// initialize variables for the game
let player = 'X';
let isPauseGame = false;
let isGameStart = false;

// array for the winning conditions
const inputCells = new Array(9);

// array of win conditions
const winConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

// add event listener to each cell
cells.forEach((cell, index) => {
  cell.addEventListener('click', () => {
    tapCell(cell, index);
  });
});

// function to handle the cell click event
function tapCell(cell, index) {
  // Ensure cell is empty and game isn't paused
  if (cell.textContent == '' && !isPauseGame) {
    isGameStart = true;
    updateCell(cell, index);
    // randomly pick a player if there are no results 
    if(!checkWinner()){
        changePlayer();
        randomPick()
    }
    
  }
}

function updateCell(cell, index) {
  cell.textContent = player;
  inputCells[index] = player;
  cell.style.color = (player == 'X') ? '#1892EA' : '#A737FF'
}

function changePlayer(){
    player = (player == 'X') ? 'O' : 'X';
}

function randomPick(){
    // Pause the game to allow computer to pick
    isPauseGame = true;
    setTimeout(()=>{
        // Pick a random cell
        let randomIndex
        do{
            randomIndex = Math.floor(Math.random() * inputCells.length);
        }while(
            //Ensure the choosen cell is empty
            inputCells[randomIndex] != ''
        )
        // Update the cell with the computer's mark
        updateCell(cells[randomIndex], randomIndex);
        //Check if computer won
        if(!checkWinner()){
            changePlayer();
            //switch back to player
            isPauseGame = false;
            return
        }
        player = (player == 'X') ?  'O' : 'X'
    },1000)
}

function checkWinner(){
    for(const [a,b,c] of winConditions){
        // check each winning conditions

        if(inputCells[a]==player && inputCells[b]==player && inputCells[c]==player){
            declareWinner([a, b, c]);
            return true;
        }
    }
    // check for a draw match
    if(inputCells.every(cell => cell != '')){
        declareDraw();
        return true;
    }
}

function declareWinner(winningIndices){
    titleHeader.textContent = `${player} Win`
    isPauseGame = true;

    // HighLight winning cells
    winningIndices.forEach((index)=>
    cells[index].style.background = '#2A2343'
    )
    restartBtn.style.visibility = 'visible'
}

function declareDraw(){
    titleHeader.textContent = 'Draw'
    isPauseGame = true;
    restartBtn.style.visibility = 'visible'
}

function choosePlayer(selectedPlayer){
    // Ensure the game has not yet been started
    if(!isGameStart){
        //Override the selected palyer.
        player = selectedPlayer
        if(player == 'X'){
            // Highlight X display
            xPlayerDisplay.classList.add('player-active');
            oPlayerDisplay.classList.remove('player-active');
        }else{
            // Highlight O display
            xPlayerDisplay.classList.remove('player-active');
            oPlayerDisplay.classList.add('player-active');
        }
    }
}

restartBtn.addEventListener('click',()=>{
    restartBtn.style.visibility ='hidden'
    inputCells.fill('')
    cells.forEach(cell =>{
        cell.textContent = ''
        cell.style.background = ''
    })
    isPauseGame = false
    isGameStart = false
    titleHeader.textContent = 'Choose'
})


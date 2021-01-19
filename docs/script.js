//player factory
const player = (marker) => {
    let _marker = marker;
    let getMarker = () => _marker;
    let setMarker = (newMarker) => _marker = newMarker; 

    return {getMarker, setMarker};
};

//game module
const game = (() => {

    //check for winner
    let _checkWin = ((idx) => {
        //the combinations with 4 digits cover exceptions
        let _possibleWins = ["048", "246", "012", "345", "678", "036", "147", "258", "0148", "0248", "0348", "0458", "0468", "0478", "2346", "2456"]; 
        //RegEx constructor from all possible winning combinations
        let _masterPattern = new RegExp(_possibleWins.join("|"));
        return _masterPattern.test(idx);
    });


    //game outcomes
    let _win = ((board, alert) => {
        board.style.display = "none";
        alert.style.display = "inline-block"
        alert.innerHTML = "You won the game!"
    });

    let _lose = ((board, alert) => {
        board.style.display = "none";
        alert.style.display = "inline-block"
        alert.innerHTML = "You lost the game!"
    });

    let _draw = ((board, alert) => {
        board.style.display = "none";
        alert.style.display = "inline-block"
        alert.innerHTML = "It's a draw!"
    });


    //check if the game is over
    let gameOver = ((playerMoves, computerMoves, displayBoard, alertText, boardArray) => {
        //check for winning combinations
        let playerTest = _checkWin(playerMoves);
        let computerTest = _checkWin(computerMoves);

        //sum up all items in array
        let arrItems = boardArray.reduce((acc, item) => acc + item, "");
        //get the length of the string created
        let arrFull = arrItems.length;
        
        if (playerTest !== false) {
            _win(displayBoard, alertText);
        } else if (computerTest !== false) {
            _lose(displayBoard, alertText);
        } else if (arrFull === 9) {
            _draw(displayBoard, alertText);
        };
    });

    return {gameOver};

})();


//board module
const board = (() => {

    //cache all DOM elements
    const _displayBoard = document.getElementById("board");
    const _displayBoardSquares = Array.from(document.getElementsByClassName("board-square"));
    const _xbuttonMarker = document.getElementById("btn-x");
    const _obuttonMarker = document.getElementById("btn-o");
    const _alertText = document.getElementById("game-alert");
    const _resetBtn = document.getElementById("reset-btn");

    //sets an empty array with 9 slots
    let _board = Array.apply(null, Array(9)).map(() => {});
    //initializes the player object
    let player1 = player("x");
    let computer = player("o");


    //initialize all the necessary functions
    let _boardInit = () => {
        _getPlayerMove();
        _markerControlBtns();
        _resetGame();
    };


    //set the marker used by the player
    let _markerSetter = ((marker) => {
        player1.setMarker(marker);

        if (marker === "x") {
            computer.setMarker("o");//computer gets the oposite marker
            _xbuttonMarker.classList = "clicked-button";
            _obuttonMarker.classList.remove("clicked-button");
        } else if (marker === "o") {
            computer.setMarker("x");
            _xbuttonMarker.classList.remove("clicked-button");
            _obuttonMarker.classList = "clicked-button";
        };
    });


    //add click event to the marker buttons
    let _markerControlBtns = (() => {
        //start with the x button focused
        _xbuttonMarker.classList = "clicked-button";
        //add click event to the x button
        _xbuttonMarker.addEventListener("click", () => {
            _markerSetter("x");
        });

        //add click event to the o button
        _obuttonMarker.addEventListener("click", () => {
            _markerSetter("o");
        });
    });


    //insert the selected marker in the corresponding index of array
    let _pushToBoard = ((player, idx) => {
        let playerMarker = player.getMarker();
        //only push if the position is empty
        if (_displayBoardSquares[idx] != undefined){
            _board.splice(idx, 1, playerMarker);
        };
    });


    //render the visual representation for the choices
    let _renderPlayerMove = (player, selected) => {
        let move = document.createElement("div");
        move.classList = player.getMarker();
        //only push if the position is empty
        if (_displayBoardSquares[selected] != undefined) {
            _displayBoardSquares[selected].appendChild(move);
        };
    };


    //return a string with the indexes containing the specified value in the array
    let _reduceIdx = ((marker) => {
        const indexes = _board.reduce((idx, item, i) => {
            if (item === marker) {idx += i;};
            return idx;
        }, []);
        return {indexes};
    });


    //return the empty indexes of the array
    let _getAvailableMoves = (() => {
        let emptySlots = _reduceIdx(undefined).indexes;
        return {emptySlots}
    });


    //generate a random move for the computer
    let _getComputerMove = (() => {
        availableMoves = _getAvailableMoves().emptySlots;
        availableMovesArray = availableMoves.split("");
        randomMove = availableMovesArray[Math.floor(Math.random()*availableMovesArray.length)];
        return {randomMove};
    });


    //excute, store and render the computer's move
    let _computerMove = (() => {
        availableMoves = _getAvailableMoves().emptySlots.length;
        //computer move if there are still available moves
        if (availableMoves > 0) {
            computerMove = _getComputerMove().randomMove;
            _pushToBoard(computer, computerMove);//store the selected move in the array
            _renderPlayerMove(computer, computerMove);//display the selected move in the board
        };
    });


    //store and render the player's move
    let _playerMove = ((ev) => {
        let selectedCell = ev.target.id.slice(-1); //get the position from the id of the button clicked
        _pushToBoard(player1, selectedCell);//store the selected move in the array
        _renderPlayerMove(player1, selectedCell);//display the selected move in the board
    });


    //add event to each square of the board
    let _getPlayerMove = (() => {
        for (i = 0; i < _displayBoardSquares.length; i++) {
            _displayBoardSquares[i].addEventListener("click", e => {
                //get moves
                _playerMove(e);
                _computerMove();

                //calculate the index
                let _xMoves = _reduceIdx(player1.getMarker()).indexes;
                let _oMoves = _reduceIdx(computer.getMarker()).indexes;

                //check if the game is over and run the necessary functions
                game.gameOver(_xMoves, _oMoves, _displayBoard, _alertText, _board);
            });
        };
    });


    //render the reset in the displayed elements
    let _renderReset = (() => {
        let _boardSquares = _displayBoardSquares; //cache the board squares

        //loop trough the board squares
        for (i = 0; i < _boardSquares.length; i++) {
            //remove child, if it exists
            if (_boardSquares[i].children[0] != undefined) {
                _boardSquares[i].removeChild(_boardSquares[i].children[0]); 
            };
        };

        //ensure the grid will be normally displayed after the reset
        _displayBoard.style.display = "grid";
        _alertText.style.display = "none";
    });


    let _resetGame = (() => {
        //add click event to the reset button
        _resetBtn.addEventListener("click", () => {
            _board = Array.apply(null, Array(9)).map(() => {});; //reset the board array
            _markerSetter("x"); //set the player marker as x and alter the btn focus
            _renderReset();
        });
    });
    
    _boardInit();
    
})();


// ---- TO DO ------

//AI
//retorna os niveis de dificuldade possiveis
//retorna a jogada baseada na dificuldade

//BUGS
//can add two divs at the same square of the board
//exceptions to the winning test for vertical combinations
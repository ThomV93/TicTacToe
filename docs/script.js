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
        alert.innerHTML = "You won the game!"
    });

    let _lose = ((board, alert) => {
        board.style.display = "none";
        alert.innerHTML = "You lost the game!"
    });

    let _draw = ((board, alert) => {
        board.style.display = "none";
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

    //initialize all the necessary functions related to the player object
    let _boardInit = () => {
        _getPlayerMove();
        _markerBtns();
        _resetGame();
    };

    //set the marker used by the player
    let _markerSetter = ((marker) => {
        player1.setMarker(marker);

        if (marker === "x") {
            _xbuttonMarker.classList = "clicked-button";
            _obuttonMarker.classList.remove("clicked-button");
        } else if (marker === "o") {
            _xbuttonMarker.classList.remove("clicked-button");
            _obuttonMarker.classList = "clicked-button";
        };
    });

    //add click event to the marker buttons
    let _markerBtns = (() => {
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

    //insert the selected marker in the equivalent array index
    let _pushToBoard = ((idx) => {
        let playerMarker = player1.getMarker();
        //only push if the position is empty
        if (_displayBoardSquares[idx] != undefined){
            _board.splice(idx, 1, playerMarker);
        };
    });

    //render the visual representation for the choices
    let _renderPlayerChoice = (selected) => {
        let move = document.createElement("div");
        move.classList = player1.getMarker();
        //only push if the position is empty
        if (_displayBoardSquares[selected] != undefined) {
            _displayBoardSquares[selected].appendChild(move);
        };
    };

    //return a string with the indexes containing the specified marker
    let _reduceIdx = ((marker) => {
        const indexes = _board.reduce((idx, item, i) => {
            if (item === marker) {idx += i;};
            return idx;
        }, []);
        return {indexes};
    });

    let _getAvailableMoves = (() => {
        let emptySlots = _reduceIdx(undefined).indexes;
        return {emptySlots}
    });

    let _getComputerPlay = (() => {
        availableMoves = _getAvailableMoves().emptySlots;
        movesArray = availableMoves.split("");
        randomMove = movesArray[Math.floor(Math.random()*movesArray.length)];
        return {randomMove};
    });

    //add event to each square
    let _getPlayerMove = (() => {
        for (i = 0; i < _displayBoardSquares.length; i++) {
            _displayBoardSquares[i].addEventListener("click", e => {
                let selectedCell = e.target.id.slice(-1); //get the position from the id of the button clicked
                _pushToBoard(selectedCell);//store the selected move in the array
                _renderPlayerChoice(selectedCell);//display the selected move in the board
                console.log(_getComputerPlay().randomMove);

                //calculate the index
                let xMoves = _reduceIdx("x").indexes;
                let oMoves = _reduceIdx("o").indexes;

                //check if the game is over and run the necessary functions
                game.gameOver(xMoves, oMoves, _displayBoard, _alertText, _board);
            });
        };
    });

    let _resetGame = (() => {
        let _boardSquares = _displayBoardSquares; //cache the board squares

        //add click event to the reset button
        _resetBtn.addEventListener("click", () => {
            _board = Array.apply(null, Array(9)).map(() => {});; //reset the board array
            _markerSetter("x"); //set the player marker as x and alter the btn focus

            //loop trough the board squares
            for (i = 0; i < _boardSquares.length; i++) {
                //remove child, if it exists
                if (_boardSquares[i].children[0] != undefined) {
                    _boardSquares[i].removeChild(_boardSquares[i].children[0]); 
                };
            };
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
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
    let checkWin = ((idx) => {
        //the combinations with 4 digits cover the diagonal exceptions
        let _possibleWins = ["048", "246", "012", "345", "678", "036", "147", "258", "0148", "0248", "0348", "0458", "0468", "0478", "2346", "2456"]; 
        //RegEx constructor from all possible winning combinations
        let _masterPattern = new RegExp(_possibleWins.join("|"));
        return _masterPattern.test(idx);
    });

    return {checkWin};

})();


//board module
const board = (() => {

    //cache all DOM elements
    const _displayBoard = Array.from(document.getElementsByClassName("board-square"));
    const _xbuttonMarker = document.getElementById("btn-x");
    const _obuttonMarker = document.getElementById("btn-o");

    //sets an empty array with 9 slots
    let _board = new Array(9);
    let player1 = player("x");

    //initialize all the necessary functions related to the player object
    let _playerInit = () => {
        _getPlayerMove();
        _markerBtns();
    };

    //set the marker used by the player
    let _markerSetter = ((marker) => {
        player1.setMarker(marker);
    });

    let _markerBtns = (() => {
        //start with the x button focused
        _xbuttonMarker.classList = "clicked-button";
        //add click event to the x button
        _xbuttonMarker.addEventListener("click", () => {
            _markerSetter("x");
            _xbuttonMarker.classList = "clicked-button";
            _obuttonMarker.classList.remove("clicked-button");
        });

        //add click event to the o button
        _obuttonMarker.addEventListener("click", () => {
            _markerSetter("o");
            _xbuttonMarker.classList.remove("clicked-button");
            _obuttonMarker.classList = "clicked-button";
        });
    });

    //insert the selected marker in the equivalent array index
    let _pushToBoard = ((idx) => {
        let playerMarker = player1.getMarker();
        //only push if the position is empty
        if (_displayBoard[idx] != undefined){
            _board.splice(idx, 1, playerMarker);
        };
    });

    //render the visual representation for the choices
    let _renderPlayerChoice = (selected) => {
        let move = document.createElement("div");
        move.classList = player1.getMarker();
        //only push if the position is empty
        if (_displayBoard[selected] != undefined) {
            _displayBoard[selected].appendChild(move);
        };
    };

    //return a string with the indexes containing the specified marker
    let _reduceIdx = ((marker) => {
        const indexes = _board.reduce((idx, item, i) => {
            if (item === marker) {
                idx += i;
            };
            return idx;
        }, []);
        return {indexes};
    });

    //add event to each square
    let _getPlayerMove = (() => {
        for (i = 0; i < _displayBoard.length; i++) {
            _displayBoard[i].addEventListener("click", e => {
                //get the position form the id of the button clicked
                let selectedCell = e.target.id.slice(-1);
                _pushToBoard(selectedCell);//store the selected move in the array
                _renderPlayerChoice(selectedCell);//display the selected move in the board

                let xMoves = _reduceIdx("x").indexes;
                let oMoves = _reduceIdx("o").indexes;
                console.log(game.checkWin(xMoves));
                console.log(game.checkWin(oMoves));
            });
        };
    });
    
    _playerInit();
    
})();




//PLAYER

//BOARD
//player escolhe marker
//escuta a jogada do player - OK
//player escolhe nivel do AI
//marker é colocado no index certo na lista - OK
//marker é representado no display na posicao certa - OK
//computador faz a jogada

//GAME
//testa se o round tem vencedor
//testa se o jogo tem vencedor

//AI
//retorna os niveis de dificuldade possiveis
//retorna a jogada baseada na dificuldade

//BUGS
//can add two divs at the same square of the board
//exceptions to the winning test for vertical combinations
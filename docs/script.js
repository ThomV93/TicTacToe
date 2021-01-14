//player factory
const player = (marker) => {
    let _marker = marker;
    let getMarker = () => _marker;

    return {getMarker};
};


//board module
const gameBoard = (() => {
    //cache all DOM elements
    const _displayBoard = Array.from(document.getElementsByClassName("board-square"));
    //sets an empty array with 9 slots
    let _board = new Array(9);
    let player1 = player("x");

    //initialize all the necessary functions related to the player object
    let _playerInit = () => {
        _getPlayerMove();
    };

    //insert the selected marker in the equivalent array index
    let _pushToBoard = ((idx) => {
        let playerMarker = player1.getMarker();
        _board.splice(idx, 1, playerMarker);
    });

    //get the selected square
    let _getDisplaySquare = ((pos) =>{
        let displayBoardPosition = _displayBoard[pos];
        return displayBoardPosition;
    });

    //creates the visual representation for the choices
    let _renderPlayerChoice = (selected) => {
        let move = document.createElement("div");
        move.classList = player1.getMarker();
        _getDisplaySquare(selected).appendChild(move);
    };

    //add event to each square
    let _getPlayerMove = (() => {
        for (i = 0; i < _displayBoard.length; i++) {
            _displayBoard[i].addEventListener("click", e => {
                selectedCell = e.target.id.slice(-1);
                _pushToBoard(selectedCell);//store the selected move in the array
                _renderPlayerChoice(selectedCell);//display the selected move in the board
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

//DISPLAY
//borda branca no bg para corrigir o bug do tabuleiro
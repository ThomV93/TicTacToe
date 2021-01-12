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

    let _pushToBoard = ((idx) => {
        let playerMarker = player1.getMarker();
        _board.splice(idx, 1, playerMarker);
    });

    //add event to each square
    let _getPlayerMove = (() => {
        for (i = 0; i < _displayBoard.length; i++) {
            _displayBoard[i].addEventListener("click", e => {
                selectedCell = e.target.id.slice(-1);
                _pushToBoard(selectedCell);//push the selected move to the equivalent idx position of the array
                _renderPlayerChoice(selectedCell);//display the selected move in the board
            });
        };
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

    _getPlayerMove();

})();




//PLAYER

//BOARD
//player escolhe marker
//escuta a jogada do player - OK
//player escolhe nivel do AI
//marker é colocado no index certo na lista - OK
//marker é representado no display na posicao certa - OK
//computador faz a jogada
//todos os processos envolvendo DOM

//GAME
//testa se o round tem vencedor
//testa se o jogo tem vencedor

//AI
//retorna os niveis de dificuldade possiveis
//retorna a jogada baseada na dificuldade
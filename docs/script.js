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

    //add event to each square
    let _getPlayerMove = (() => {
        for (i = 0; i < _displayBoard.length; i++) {
            _displayBoard[i].addEventListener("click", e => {
                selectedCell = e.target.id.slice(-1);
                _renderPlayerChoice(selectedCell);
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
//player escolhe marker
//player escolhe nivel do AI

//BOARD
//escuta a jogada do player
//computador faz a jogada
//marker é colocado no index certo na lista
//marker é representado no display na posicao certa
//todos os processos envolvendo DOM

//GAME
//testa se o round tem vencedor
//testa se o jogo tem vencedor

//AI
//retorna os niveis de dificuldade possiveis
//retorna a jogada baseada na dificuldade
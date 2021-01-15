//player factory
const player = (marker) => {
    let _marker = marker;
    let getMarker = () => _marker;

    return {getMarker};
};

//game module
const game = (() => {

    //check for winner
    let checkWin = ((idx) => {
        let _possibleWins = ["048", "246", "012", "345", "678", "036", "147", "258", "0148", "0248", "0348", "0458", "0468", "0478", "2346", "2456"]; 
        //RegEx constructor from all possible winning combinations
        let masterPattern = new RegExp(_possibleWins.join("|"));
        return masterPattern.test(idx);
    });

    return {checkWin};

})();


//board module
const board = (() => {

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
        //only push if the position is empty
        if (_displayBoard[idx] != undefined){
            _board.splice(idx, 1, playerMarker);
        };
    });

    //creates the visual representation for the choices
    let _renderPlayerChoice = (selected) => {
        let move = document.createElement("div");
        move.classList = player1.getMarker();
        //only push if the position is empty
        if (_displayBoard[selected] != undefined) {
            _displayBoard[selected].appendChild(move);
        };
    };

    //return a string with the indexes containing the especified marker
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

                let selectedCell = e.target.id.slice(-1);
                _pushToBoard(selectedCell);//store the selected move in the array
                _renderPlayerChoice(selectedCell);//display the selected move in the board

                let xMoves = _reduceIdx("x").indexes;
                console.log(xMoves);
                console.log(game.checkWin(xMoves));
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
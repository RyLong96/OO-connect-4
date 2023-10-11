class Game {
    constructor(player1, player2, WIDTH = 7, HEIGHT = 6){
      this.board = [];
      this.WIDTH = WIDTH;
      this.HEIGHT = HEIGHT;
      this.currPlayer = 1;
      this.makeBoard();
      this.makeHtmlBoard();
      this.player1 = player1;
      this.player2 = player2;
    }

    findSpotForCol(x){
        for(let y = this.HEIGHT -1; y >= 0; y--){
            if(!this.board[y][x]){
                return y;
            }
        }
        return null;
    }
    makeBoard(){
      for (let y = 0; y < this.HEIGHT; y++) {
        this.board.push(Array.from({ length: this.WIDTH }));
      }
    }
    makeHtmlBoard() {
        
      const board = document.getElementById('board');
      const top = document.createElement('tr');
      top.setAttribute('id', 'column-top');

      this.gameClick = this.handleClick.bind(this);
      top.addEventListener('click', this.gameClick);
    
      for (let x = 0; x < this.WIDTH; x++) {
        const headCell = document.createElement('td');
        headCell.setAttribute('id', x);
        top.append(headCell);
      }
    
      board.append(top);
    
      for (let y = 0; y < this.HEIGHT; y++) {
        const row = document.createElement('tr');
    
        for (let x = 0; x < this.WIDTH; x++) {
          const cell = document.createElement('td');
          cell.setAttribute('id', `${y}-${x}`);
          row.append(cell);
        }
    
        board.append(row);
      }
    }
    placeInTable(y, x) {
      const piece = document.createElement('div');
      piece.classList.add('piece');
      piece.style.backgroundColor = this.currPlayer === 1 ? this.player1.color : this.player2.color;
      piece.classList.add(`p${this.currPlayer}`);
      piece.style.top = -50 * (y + 2);
    
      const spot = document.getElementById(`${y}-${x}`);
      spot.append(piece);
    }
    
    
    endGame(msg) {
        
        alert(msg);
        const topRow = document.getElementById('column-top');
        topRow.removeEventListener('click', this.gameClick);
    }
    
    
    handleClick(evt) {
      const x = +evt.target.id;
    
      const y = this.findSpotForCol(x);
      if (y === null) {
        return;
      }
    
      this.board[y][x] = this.currPlayer;
      this.placeInTable(y, x);
      
      if (this.checkForWin()) {
        return this.endGame(`Player ${this.currPlayer} won!`);
      }
      
      if (this.board.every(row => row.every(cell => cell))) {
        return this.endGame('Tie!');
      }
        
      this.currPlayer = this.currPlayer === 1 ? 2 : 1;
    }
    
    
    checkForWin() {
      const _win = (cells) => {
  
    
        return cells.every(
          ([y, x]) =>
            y >= 0 &&
            y < this.HEIGHT &&
            x >= 0 &&
            x < this.WIDTH &&
            this.board[y][x] === this.currPlayer
        );
      }
    
      for (let y = 0; y < this.HEIGHT; y++) {
        for (let x = 0; x < this.WIDTH; x++) {
  
          const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
          const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
          const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
          const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
    
          if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
            return true;
          }
        }
      }
    }
    
  }

  class Player {
    constructor(color){
        this.color = color;
    }
}
  const startGame = document.querySelector('#startBtn');

  startGame.addEventListener('click', function(e){
    e.preventDefault();
    const board = document.getElementById('board');
    board.innerHTML = " ";
    
    startGame.innerHTML = 'Restart Game';
    const player1 = new Player(document.querySelector('.player1').value)
    const player2 = new Player(document.querySelector('.player2').value)
    new Game(player1, player2);
  });





  
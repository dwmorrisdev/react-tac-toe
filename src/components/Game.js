import React from 'react';
import Header from './Header';
import Board from './Board';

  
class Game extends React.Component {
    constructor() {
        super();
        this.state = {
            history: [{
                squares: Array(9).fill(null)
            }],
            stepNumber: 0,
            xIsNext: true,
            moves: [ 'Game Start'],
            isDesc: true
        };
    }
    calculateWinner(squares) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
          ];
          for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
              return squares[a];
            }
          }
          return null;
    }
    jumpTo(step){
        this.setState({
           stepNumber: step,
           xIsNext: ( step % 2 ) ? false : true
        });
    }
    handleClick(i){
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if (this.calculateWinner(squares) || squares[i]) {
          return;
        }

        squares[i]= this.state.xIsNext ? 'X' : 'O';
        
        let x, y; // coordinates of the current move
        if ( i > 5 ) {
          x = 3;
          y = i - 5;
        } else if( i > 2 ) {
          x = 2;
          y = i - 2;
        } else {
          x = 1;
          y = i + 1;
        }
        // const move = ; // key for <li>
        const desc = squares[i] + ' moved to (' + x + ',' + y + ').';
        const moves = this.state.moves.slice(0, this.state.stepNumber + 1);
        moves.push(desc);
        
        this.setState({
            history: history.concat([{
                squares
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
            moves
         });
         console.log('moves', moves);
         console.log('history', history);
    }
    handleToggleOrder(i) {
        // set state to flipped value
        this.setState( (prevState) => ({
            isDesc: !this.state.isDesc
        }));
    }
    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = this.calculateWinner(current.squares);

        console.log(`stepNumber ${this.state.stepNumber}`);

        let status;
        if (winner) {
          status = `Winner: ${ winner }`;
        } else {
            status = `Next player: ${ this.state.xIsNext ? 'X' : 'O' }`;
        }
        
        let moves = this.state.moves.map((step, move) => {
            if(move === this.state.stepNumber) {return (
              <li key={move}>
                <button
                    className="button"
                    onClick={ () => this.jumpTo(move) } 
                    style={{color: '#B7D5D4'}}>{step}</button>
              </li>
            )}  else {return (
                <li key={move}>
                <button 
                    className="button"
                    onClick={ () => this.jumpTo(move) }>{step}</button>
              </li>
            )}
        });

        if(!this.state.isDesc) moves.reverse();
        
        return (
            <div>
                <Header />
                <div className="game">    
                <div className="game-board">
                    <Board 
                        squares={current.squares}
                        onClick={ (i) => this.handleClick(i)}
                        getWinner={ this.calculateWinner}/>
                </div>
                <div className="game-info">
                    <div className="status">{ status }</div>
                    {history.length >= 1 && <button className="button" onClick={ (i) => this.handleToggleOrder(i) }>Toggle Order</button>}
                    <ol>{moves}</ol>
                </div>
                </div>
            </div>
            
        );
        }
}

export default Game;
import React from 'react';
import Square from './Square';

class Board extends React.Component {   
  getWinner(squares) {
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
      // Define a, b, c
      const [a, b, c] = lines[i]; 
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return [a, b, c]; 
      }
    }
    return null;
  }
  renderSquare(i) {
    const winSquares = this.getWinner(this.props.squares);
    console.log(`winSquares ${winSquares}`);
     
     if(winSquares) {
       if(i === winSquares[0] || i === winSquares[1] || i === winSquares[2]) {
         //console.log('background color should be set for square: ', i);
         return (
              <div className="win-square" key={i}>
                <Square 
                  value={ this.props.squares[i] } 
                  onClick={ () => this.props.onClick(i) } />
              </div>);
       } else {
         // console.log('winsquares is true, but color wasnt set');
         return ( <div className="non-win" key={i} >
                    <Square 
                      value={ this.props.squares[i] } 
                      onClick={ () => this.props.onClick(i) } />
                  </div>);
       }
      
     } else {
       // console.log('winsquares was false');
       return <Square 
                key={i} 
                value={ this.props.squares[i] } 
                onClick={ () => this.props.onClick(i) }/>;
   }
  }
    render() {
      let row = [], boardRow =[];
      for(let i=0; i<3; i++) {
        for (let j=0; j<3; j++) {
          row.push(this.renderSquare(j + i * 3));
        };
        boardRow.push(<div key={i} className="board-row">{row}</div>);
        row = [];
      }
      const board = <div> {boardRow} </div>;
     
      console.log('board',board);
       
      return board;
    }
}

export default Board;
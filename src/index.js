import React from 'react';
import ReactDOM from 'react-dom';
import styles from './index.css';
function calculateWinner(squares) {
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

class Square extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }
    render() {
        return (
            <button className="square"
            onClick={() => this.props.onClick()}
            >
                {this.props.value}
            </button>
        );
    }
}
class Button extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div>
                <button onClick= {() => this.props.onClick()}>Reiniciar</button>
            </div>
        );
    }
}
class Board extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            nextMark: 'X'
        };
    }
    handleButtonClick(){
        this.setState({
            squares: Array(9).fill(null)
        });
    }
    handleClick(i){
        const squares = this.state.squares.slice();
        if (calculateWinner(squares)||squares[i]){
            return;
        }
        if (squares[i] === null){
            squares[i] = this.state.nextMark;
            if(this.state.nextMark === 'X'){
                this.setState({nextMark:'O'});
            } else{
                this.setState({nextMark:'X'});
            }
        }
        this.setState({squares: squares});
    }
    renderSquare(i) {
        return (
        <Square
        value = {this.state.squares[i]}
        onClick = {() => this.handleClick(i)}
        />
        );
    }
    

    render() {
        const winner = calculateWinner(this.state.squares);
        const button = winner ? <Button onClick={() => this.handleButtonClick()}/>: ''
        let status;
        if (winner){
            status = 'Winner: ' + winner;
        } else{
            status = 'Next player: '.concat(this.state.nextMark);
        }
        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
                {button}
            </div>
        );
    }
}
class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
import React from 'react';
import ReactDOM from 'react-dom';
import styles from './index.css';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import 'typeface-roboto';
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
    console.dir(squares)
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    // if(!(indexOf(null))){
    //     alert("DEU VELHA!")
    // }
    return null;
  }
function isDraw(squares){
    if (!(squares.indexOf(null) in squares)){
        return true;
    }
    return false;
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
            <Button variant="outlined" className="square"
            onClick={() => this.props.onClick()}
            >
                {this.props.value}
            </Button>
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
        const button = winner || isDraw(this.state.squares) ? <Button variant="contained" color="primary" onClick={() => this.handleButtonClick()}>Reiniciar</Button>: ''
        let status;
        if (winner){
            status = 'Ganhador: ' + winner;
        } else if(isDraw(this.state.squares)){
            status = 'Não há ganhadores. Reinicie o jogo!';
        }
        else{
            status = 'Próximo jogador: '.concat(this.state.nextMark);
        }
        return (
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant="h5" gutterBottom>{status}</Typography>
                </Grid>
                <Grid item xs={12}>
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </Grid>
                <Grid item xs={12}>
                     {this.renderSquare(3)}
                     {this.renderSquare(4)}
                     {this.renderSquare(5)}
                </Grid>
                <Grid item xs={12}>
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </Grid>
                {button}
            </Grid>
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
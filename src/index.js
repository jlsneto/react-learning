import React from 'react';
import ReactDOM from 'react-dom';
import styles from './index.css';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
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
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
function isDraw(squares){
    if (!(squares.indexOf(null) in squares)){
        return true;
    }
    return false;
}

class AlertDialog extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            open: true,
          };
    }
  
    handleClickOpen(){
      this.setState({ open: true });
    };
  
    handleClose(){
      this.setState({ open: false });
    };
  
    render() {
      return (
        <div>
          <Dialog
            open={this.state.open}
            onClose={() => this.handleClose()}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Fim de Partida"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                  {this.props.status}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
            {this.props.buttonReload}
            <Button onClick={() =>this.handleClose()} color="primary">
              Visualizar
            </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
    }
  }

class Square extends React.Component {
    render() {
        const {value} = this.props;
        let color = "default"
        let variant = 'contained'
        if(value === 'X'){
            color = 'secondary' 
        }else if(value === 'O'){
            color = 'primary'
        }
        return (
            <Button variant={color!=='default' ? variant:"outlined"} className="square" color={color ? color:"default"}
            onClick={() => this.props.onClick()}
            style={{margin:5}}
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
            nextMark: 'X',
            squareColor: null
        };
    }
    handleButtonClick(){
        this.props.onWinner(calculateWinner(this.state.squares))
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
        color = {this.state.squareColor}
        onClick = {() => this.handleClick(i)}
        />
        );
    }
    

    render() {
        let headerMessage;
        const winner = calculateWinner(this.state.squares);
        const buttonReload = <Button color="primary" autoFocus style={{float:"right", marginLeft:"28%"}} onClick={() => this.handleButtonClick()}>Limpar campo</Button>
        let status = "Fim da partida";
        if (winner){
            status = `Parabéns jogador ${winner}. Vamos para a próxima rodada! (:`;
            headerMessage = "Temos um Vencedor!"
        } else if(isDraw(this.state.squares)){
            status = 'Aaaah não. DEU VELHA! :( ... Mas não desanimem e vamos para a próxima rodada!';
            headerMessage = "Deu Velha!"
        }
        else{
            headerMessage = 'Quem joga: '.concat(this.state.nextMark);
        }
        const dialog = winner || isDraw(this.state.squares) ? <AlertDialog status={status} buttonReload={buttonReload}></AlertDialog>: null
        return (
            <Grid style={{minWidth:255}}>
                <Grid item>
                    <Typography variant="h5" gutterBottom style={{marginTop:20, marginLeft:"20%"}}>{headerMessage}</Typography>
                </Grid>
                <Grid item>
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </Grid>
                <Grid item>
                     {this.renderSquare(3)}
                     {this.renderSquare(4)}
                     {this.renderSquare(5)}
                </Grid>
                <Grid item>
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </Grid>
                {this.props.renderPlayers()}
                <Grid item>
                    {buttonReload}
                </Grid>
                <Grid item>
                    {dialog}
                </Grid>
            </Grid>
        );
        
    }
}

class Player{
    constructor(name, mark){
        this.name = name;
        this.mark = mark
        this.score = 0
    }
    onWinner(){
        this.score += 1
        return this
    }
}
class Game extends React.Component {
    constructor(props){
        super(props)
        const player1 = new Player('Playername', 'X')
        const player2 = new Player('Playername', 'O')
        this.state = {
            players: [player1,player2]
        }
    }
    renderPlayers(){
        return (this.state.players.map((player) => {
            return <Grid item><Typography variant="caption" gutterBottom>{player.name} {player.mark} : {player.score} </Typography></Grid>
        }))
    }
    render() {
        return (
            <Card>
            <div className="container">
                <div className="game-board">
                    <Board renderPlayers={() => this.renderPlayers()} onWinner={(e) => this.onWinner(e)}></Board>
                </div>
            </div>
            </Card>
        );
    }
    onWinner(winner){
        const n = this.state.players.map((e,i)=>{
            if(e.mark === winner){
                e.onWinner()
            }
            return e
        })
        this.setState({players:n})
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
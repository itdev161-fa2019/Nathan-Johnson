import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
      return (
        <button 
        className="square" 
        onClick={() =>  props.onClick()}
      >
        {props.value}
        </button>
      );
    }
  
  
  class Board extends React.Component {
    renderSquare(i) {
      return <Square 
      value={this.props.squares[i]}
      onClick={() => {
       this.props.onClick(i)

     
      

    }}
        />;
    }

    render() {
      return (
        <div>
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
        
          <button onClick={()=>{window.location.reload();}}>Try Again</button>
      </div>
      );
    }
  }
  
  class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          history: [{
            squares: Array(9).fill(null)
          }],
          stepNumber: 0,
          xIsNext: true
        };
      }
    
      handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length-1];

        const squares = current.squares.slice();
        if (calculateWinner(squares) == 'X') {
            return;
          }

        squares[i] = 'X'; 
            this.setState({
                history: history.concat([{
                    squares: squares
                  }]),
                  xIsNext: !this.state.xIsNext,
                  stepNumber: history.length,
                }); 

                setTimeout(() => {
                    this.randomG(i) 
                  }, 1000); 
        }

        jumpTo(step) {
            this.setState({
              stepNumber: step,
              xIsNext: (step % 2) === 0,
            });
          }


          // Mokeny learning section
          randomG (i) {
            const history = this.state.history.slice(0, this.state.stepNumber + 1);
            const current = history[history.length - 1];
            const squares = current.squares.slice();
            if (calculateWinner(squares) == 'X') {
                return;
              }
            squares[i] =  'X'
            const random1 = Math.floor(Math.random() * 8);
            console.log(random1)
            const random2 = Math.floor(Math.random() * 8);
            console.log(random2)
            const random3 = Math.floor(Math.random() * 8);
            console.log(random3)
            const random4 = Math.floor(Math.random() * 8);
            console.log(random4)
            const random5 = Math.floor(Math.random() * 8);
            console.log(random5)
            const random6 = Math.floor(Math.random() * 8);
            console.log(random6)
            const random7 = Math.floor(Math.random() * 8);
            console.log(random7)

           if (squares[random1] != squares[i] &&
                squares[random1]  == null)
            squares[random1] = '0'           

           else if (squares[random2] != squares[i] &&
            squares[random2]  == null)
        squares[random2] = '0'    

            else  if (squares[random3] != squares[i] &&
                squares[random3]  == null)
            squares[random3] = '0' 

          else  if ( squares[random4] 
            == null)
          squares[random4] = '0' 

          else  if (squares[random5] 
            === null)
          squares[random5] = '0' 

           else  if (squares[random6] 
            == null)
           squares[random6] = '0' 

           else  if (squares[random7] 
            == null)
           squares[random7] = '0';

           else if(!alert('Monkey Confused!')){window.location.reload()}

            this.setState({
                history: history.concat([{
                    squares: squares
                  }]),
                  xIsNext: !this.state.xIsNext,
                  stepNumber: history.length,
                }); 
            
            }
        monkeyWin () {
        window.open("https://www.youtube.com/watch?v=vY6BITIqRd4")
                    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];

        const moves = history.map((step, move) => {
            const desc = move ?
              'Go to move #' + move :
              'Go to game start';
            return (
                
              <li key={move}>
                <button onClick={() => this.jumpTo(move)}>{desc}</button>
              </li>
            );
          });

        const winner1 = calculateWinner(current.squares);
        var winner = null;
        if (winner1 == 'X')
        winner = "You"
        if (winner1 == '0')
        winner = "Monkey"
        let status;
        if (winner) {
          status = winner + ' win!';
           
          if (status == 'Monkey' + ' win!' )
          setTimeout(() => {
            this.monkeyWin() 
          }, 2000); 

        } else {
          status = 'Next player: ' + (this.state.xIsNext ? 'You' : 'Monkey');
        }
        

      return (
         
        <div className="game">
        
          <div className="game-board">
          <h4> Lets play Tic-Tac-Toe </h4>
          <div>{status}</div>
          <div className="monkey"> 
        <img src='https://i.kym-cdn.com/photos/images/original/001/598/769/782.jpg' />
        </div>
            <Board 
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            Travel Back In Time
            <ol>{moves}</ol>
          </div>
        </div>
        
      );
    }
  }

  

  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );

  
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
  


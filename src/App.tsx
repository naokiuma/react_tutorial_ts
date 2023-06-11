import { useState } from "react";
import {calculateWinner} from "../src/library/calculateWinner"
import {Move} from "../src/types/move"



/*スクエア--------------------*/


type SquareProps = {
	move:Move;
	onSquareClick():void
}


//引数は
function Square(props:SquareProps):JSX.Element{
	return <button className="square" onClick={props.onSquareClick}>{props.move}</button>
}




/*ボード--------------------*/
type BoardProps = {
	xIsNext:boolean;
	squares:(Move)[];
	onplay:Function//gameから名前付き関数が渡っている。
}

function Board(props:BoardProps):JSX.Element {
	const squares = props.squares
	let gameStatus;


	function handleClick(i:number){
		//同じ箇所をクリックししている | またはすでにwinnerが決まっていたら終了
		if(squares[i] || calculateWinner(squares)) return
		const nextSquares = squares.slice();
		//アクションをセット
		nextSquares[i] = props.xIsNext ? 'X' : '○';
		props.onplay(nextSquares);

		//勝者判定
		const winner = calculateWinner(nextSquares);	
		//メッセージセット
		if(winner){
			gameStatus = "Winner: " + winner;
		}else{
			gameStatus = "Next player: " + (props.xIsNext ? 'X' : '○');
		}
	}


	return (
		<>
		    <div className="status">{gameStatus}</div>
			<div className="board-row">
				{/* propsは文字列の場合は{}で包まなくてもいい} */}
				{/* <Square value={squares[0]} onClick={handleClick(0)}/> */}
				{/* ↑これだと関数の返り値がプロパティに入ってしまう */}
				<Square move={squares[0]} onSquareClick={() => handleClick(0)}/>
				<Square move={squares[1]} onSquareClick={() => handleClick(1)}/>
				<Square move={squares[2]} onSquareClick={() => handleClick(2)}/>
			</div>

			<div className="board-row">
				<Square move={squares[3]} onSquareClick={() => handleClick(3)}/>
				<Square move={squares[4]} onSquareClick={() => handleClick(4)}/>
				<Square move={squares[5]} onSquareClick={() => handleClick(5)}/>
			</div>

			<div className="board-row">
				<Square move={squares[6]} onSquareClick={() => handleClick(6)}/>
				<Square move={squares[7]} onSquareClick={() => handleClick(7)}/>
				<Square move={squares[8]} onSquareClick={() => handleClick(8)}/>
			</div>
		</>
	)
}



//これをデフォルトのコンポーネントとしてエクスポートする。
// board、gameコンポーネントにはexport defaultの記述がないのはそういうこと。
export default function Game():JSX.Element{
	//次の手番
	const [xIsNext,setNext] = useState(true);

	//ゲームの流れ。初期状態では全て空にする。
	// const [history,setHistory] = useState<Card>([Array(9).fill('')])
	const [history,setHistory] = useState([Array(9).fill('')])


	const [currentMove,setCurrentMove] = useState(0)
	const curretSquares = history[currentMove];

	function handlePlay(nextSquares:[number]){
		const nextHistory = [...history.slice(0,currentMove + 1),nextSquares];
		setHistory(nextHistory)
		setCurrentMove(nextHistory.length - 1);
		setNext(!xIsNext)
	}

	//特定の状態まで戻る
	function jumpTo(NextMove:number) {
		setCurrentMove(NextMove)
		setNext(NextMove % 2 === 0)//偶数ならtrue(Xが次)
	}

	const moves = history.map((history_squares,move)=>{
		let description;
		if(move > 0){
			description = "Go to move #" + move
		}else{
			description = "Go to game start"
		}
		return(
			<li key={move}>
				<button onClick={()=>jumpTo(move)}>{description}</button>
			</li>
		)
	})

	return (
		<div className="game">
			<div className="game-board">
				{/* board→squareと違い、名前付きの関数 (onplay)を返す */}
				<Board xIsNext={xIsNext} squares={curretSquares} onplay={handlePlay} />
			</div>
			<div className="game-info">
				<ol>{moves}</ol>
			</div>
		</div>
	)
}



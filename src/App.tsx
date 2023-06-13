import { useState } from "react";
import {calculateWinner} from "../src/library/calculateWinner"
import {Move} from "../src/types/move";


// type Move = '○' | '×' | '';

/*スクエア--------------------*/
type SquareProps = {
	value:Move;
	//boardからは無名関数が渡っている。ちなみに、boardでprops渡すときにhandleClick(0)　とかいたら、
	//その実行の結果がプロパティで渡ってくるので注意。
	onSquareClick:()=> void
}
function Square(props:SquareProps):JSX.Element{
	return <button className="square" onClick={props.onSquareClick}>{props.value}</button>
}


/*ボード--------------------*/
type BoardProps = {
	xIsNext:boolean;
	squares:Move[];
	onplay:Function;
}

function Board(props:BoardProps):JSX.Element {
	const squares = props.squares

	//各マス目をクリック時の挙動。
	function handleClick(i:number){
		//同じ箇所をクリックししてる、またはすでにwinnerが決まっていたら終了
		if(squares[i] || calculateWinner(squares)) return
		//次の手順をセット
		const nextSquares:Move[] = squares.slice();
		//次の手順を確認し
		nextSquares[i] = props.xIsNext ? '×' : '○';
		props.onplay(nextSquares);
	}

	//勝者判定
	const winner = calculateWinner(squares);	
	//メッセージセット
	let gameStatus;

	if(winner){
		gameStatus = "Winner: " + winner;
	}else{
		gameStatus = "Next player: " + (props.xIsNext ? '×' : '○');
	}

	return (
		<>
		    <div className="status">{gameStatus}</div>
			<div className="board-row">
				{/* propsは文字列の場合は{}で包まなくてもいい} */}
				{/* <Square value={squares[0]} onClick={handleClick(0)}/> */}
				{/* ↑これだと関数の返り値がプロパティに入ってしまう */}
				<Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
				<Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
				<Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
			</div>

			<div className="board-row">
				<Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
				<Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
				<Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
			</div>

			<div className="board-row">
				<Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
				<Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
				<Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
			</div>
		</>
	)
}



export default function Game():JSX.Element{
	const [xIsNext,setNext] = useState(true);

	//ゲームの記録。配列の中に、9マスの配列を追加していく。
	const [history,setHistory] = useState([Array(9).fill('')])
	//現在の手順。0から増えていく
	const [currentMove,setCurrentMove] = useState(0)

	const curretSquares = history[currentMove];
	console.log('ヒストリー')
	console.log(history)
	console.log('現在のムーブ')
	console.log(currentMove)

	//Boardの中で、各マス目クリック時に発火。
	function handlePlay(nextSquares:number[]){

		//履歴に手順を追加。
		const nextHistory = [...history.slice(0,currentMove + 1),nextSquares];
		console.log('move後の配列')
		console.log(nextSquares)
		console.log('move後の履歴')
		console.log(nextHistory)
		setHistory(nextHistory)

		setCurrentMove(nextHistory.length - 1);

		setNext(!xIsNext)
	}

	function jumpTo(NextMove:number) {
		setCurrentMove(NextMove)
		setNext(NextMove % 2 === 0)//偶数ならtrue(Xが次)
	}

	//一つ一つの履歴。
	const moves = history.map((history_squares,move)=>{
		let description = move > 0 ? "Go to move #" + move : "Go to game start";
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


const currencies = ["CNY", "EUR", "GBP", "JPY", "KRW", "USD"] as const;
 

type Currency = typeof currencies
type Currency2 = typeof currencies[number]
type Currency3 = typeof currencies[2]






import { useState } from "react";
import {calculateWinner} from "../src/library/calculateWinner"


//色んな関数の書き方はこちらも参考に。


/*スクエア--------------------*/

type SquareProps = {
	value:number|string;
	//boardからは無名関数が渡っている。ちなみに、boardでprops渡すときにhandleClick(0)　とかいたら、その実行の結果がプロパティで渡ってくるので注意。
	onSquareClick:()=> void
}
function Square(props:SquareProps):JSX.Element{
	return <button className="square" onClick={props.onSquareClick}>{props.value}</button>
}




/*ボード--------------------*/
type BoardProps = {
	xIsNext:boolean;
	squares:(string | number)[];
	onplay:Function//gameから名前付き関数が渡っている。
}

function Board(props:BoardProps):JSX.Element {
	const squares = props.squares
	let gameStatus;


	// borad定義の関数
	function handleClick(i:number){

		//同じ箇所をクリックししてる、またはすでにwinnerが決まっていたら終了
		if(squares[i] || calculateWinner(squares)) return

		const nextSquares = squares.slice();
		//アクションをセット
		nextSquares[i] = props.xIsNext ? 'X' : '○';
		props.onplay(nextSquares);

		//盤石に新しい情報をセット
		// setSquares(nextSquares)

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



//これをデフォルトのコンポーネントとしてエクスポートする。
// board、gameコンポーネントにはexport defaultの記述がないのはそういうこと。
export default function Game(){
	const [xIsNext,setNext] = useState(true);

	//ゲームの初期化
	const [history,setHistory] = useState([Array(9).fill('')])


	const [currentMove,setCurrentMove] = useState(0)
	const curretSquares = history[currentMove];

	/**/
	function handlePlay(nextSquares:[number]){
		const nextHistory = [...history.slice(0,currentMove + 1),nextSquares];
		setHistory(nextHistory)
		setCurrentMove(nextHistory.length - 1);
		setNext(!xIsNext)
	}

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



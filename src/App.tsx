import { useState } from "react";
import {calculateWinner} from "../src/library/calculateWinner"

type SquareType = {
	value:number|string
}


// パターン1_A アロー関数、型定義をジェネリックで行う方法。typeを利用。-------------
// 凡庸的な型を定義する方法。React.FCは関数コンポーネントを定義する型で、React.FC<T>という形で使用する。
// const Square:React.FC<SquareType> = (props) =>{
// 	function handleClick() {
// 		console.log('clicked!');
// 	}

// 	return <button onClick={handleClick} className="square">{props.value}</button>
// }

// パターン２_A アロー関数で、型定義をジェネリックを使わずにtypeのみ行う--------------
// const Square = (props:SquareType) =>{
// 	return <button className="square">{props.value}</button>
// }

// パターン２_B 通常の関数で、型定義をジェネリックを使わずにtypeのみ行う--------------
// function Square(props:SquareType){
// 	return <button className="square">{props.value}</button>
// }

//パターン３_A アロー関数で、型定義を直に書く---------------
// const Square =({value}:{value:number}) =>{
// 	return <button className="square">{value}</button>
// }

// パターン3_B 通常の関数で、型定義を直に書く---------------
// function Square({value}:{value:number}){
// 	return <button className="square">{value}</button>
// }

// function Square({value}:{value:number}) {
// 	return <button className="square">{value}</button>;
// }

// function  Square({value}:{value:number}):JSX.Element{
// 	return <button className="square">{value}</button>
// }

type SquareProps ={
	value:number;
	onSquareClick?:()=> void

}
function Square(props:SquareProps){
	return <button className="square" onClick={props.onSquareClick}>{props.value}</button>
}





function Board():JSX.Element {
	const [squares,setSquares] = useState(Array(9).fill(''))
	const [xIsNext,setNext] = useState(true);
	const [gameStatus,setgameStatus] = useState('ゲームを始めます');	


	function handleClick(i:number){
		//同じ箇所をクリックししてる、またはすでに終了していたら終了
		if(squares[i] || calculateWinner(squares)) return

		
		const nextSquares = squares.slice();
		
		//次の番手をセット
		nextSquares[i] = xIsNext ? 'X' : '○';

		//盤石に新しい情報をセット
		setSquares(nextSquares)

		//勝者判定
		const winner = calculateWinner(nextSquares);
		
		//次のプレイヤー（trueかかfalseか）を定義
		setNext(!xIsNext)	
		
		if(winner){
			setgameStatus("Winner: " + winner);
		}else{
			setgameStatus("Next player: " + (xIsNext ? 'X' : '○'));
		}

	}

	return (
		<>
		    <div className="status">{gameStatus}</div>
			<div className="board-row">
				{/* propsは文字列の場合は{}で包まなくてもいい} */}


				{/* これだと返り値が入ってしまうので、エラーになる。 */}
				{/* <Square value={squares[0]} onClick={handleClick(0)}/> */}

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

	return (
		<div className="game">
			<div className="game-board">
				<Board/>
			</div>
		</div>
	)
}
import { useState } from "react";

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

function Square({value}:{value:string}){
	// const [value,setValue] = useState()
	// function handleClick() {
	// 	setValue('X');
	// }
	return <button className="square">{value}</button>
}


export default function Board():JSX.Element {
	const [squares,setSquares] = useState(Array(9).fill(null))
	return (
		<>
			<div className="board-row">
				{/* 文字列の場合は{}で包まなくてもいい} */}
				<Square value={squares[0]}/>
				<Square value={squares[1]}/>
				<Square value={squares[2]}/>
			</div>
			<div className="board-row">
				<Square value={squares[3]}/>
				<Square value={squares[4]}/>
				<Square value={squares[5]}/>

			</div>
			<div className="board-row">
				<Square value={squares[6]}/>
				<Square value={squares[7]}/>
				<Square value={squares[8]}/>

			</div>
      
		</>
		)
}
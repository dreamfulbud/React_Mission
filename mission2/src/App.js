import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Form from "./components/Form";
import Lists from "./components/Lists";

export default function App() {
	const [todoData, setTodoData] = useState([]);
	const [value, setValue] = useState("");

	// 할 일 입력
	const handleSubmit = (e) => {
		e.preventDefault();
		if (value !== "") {
			let newTodo = {
				id: Date.now(),
				title: value,
				completed: false,
			};

			setTodoData((prev) => [...prev, newTodo]);
			setValue("");
		}
	};

	// 로컬스토리지 불러오기
	useEffect(() => {
		const localTodoList = JSON.parse(localStorage.getItem("todoData"));
		if (localTodoList.length !== 0) {
			setTodoData(localTodoList);
		}
	}, []);

	// 로컬스토리지에 저장하기
	useEffect(() => {
		localStorage.setItem("todoData", JSON.stringify(todoData));
	}, [todoData]);

	const handleRemove = () => {
		setTodoData([]);
	};

	return (
		<>
			<Container>
				<div className="todoBlock">
					<h1>할 일 목록</h1>
					<button className="button-reset" onClick={handleRemove}>
						모두 지우기
					</button>
					<Lists todoData={todoData} setTodoData={setTodoData} />
					<Form handleSubmit={handleSubmit} value={value} setValue={setValue} />
				</div>
			</Container>
		</>
	);
}
const Container = styled.div`
	margin: auto;
	max-width: 600px;

	.todoBlock {
		padding: 2rem;
		margin-top: 50px;
		background: #fff;
		border-radius: 10px;
		box-shadow: -9px 17px 13px rgb(0 0 0/5%);
		position: relative;

		h1 {
			margin-bottom: 1rem;
		}
		.button-reset {
			position: absolute;
			top: 1.5rem;
			right: 2rem;
			border: 1px solid rgba(255, 99, 71, 0.4);
			background: #fff;
			color: rgba(255, 99, 71, 1);
			border-radius: 0.4rem;
			padding: 0.3rem 0.8rem;
			transition: all 0.3s;
			&:hover {
				color: #fff;
				background: rgba(255, 99, 71, 1);
				border: 1px solid rgba(255, 99, 71, 0.1);
			}
		}
	}
`;

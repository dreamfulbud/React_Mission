import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import List from "./List";
import "./lists.scss";

const Lists = React.memo(({ todoData, setTodoData }) => {
	const handleEnd = (result) => {
		//목적지가 없으면 이벤트 취소, 함수 종료
		if (!result.destination) return;
		// 리액트 불변성을 지켜주기 위해 새로운 todoData 생성
		const newTodoData = todoData;

		//변경시키는 아이템을 배열에서 지운 후, return 값으로 지워진 아이템을 추가해줌
		const [reorderedItem] = newTodoData.splice(result.source.index, 1);
		newTodoData.splice(result.destination.index, 0, reorderedItem);

		setTodoData(newTodoData);
		localStorage.setItem("todoData", JSON.stringify(todoData));
	};

	return (
		<DragDropContext onDragEnd={handleEnd}>
			<Droppable droppableId="todo">
				{(provided) => (
					<ul {...provided.droppableProps} ref={provided.innerRef}>
						{todoData.map((data, index) => (
							<Draggable key={data.id} draggableId={data.id.toString()} index={index}>
								{(provided, snapshot) => (
									<List key={data.id} id={data.id} title={data.title} completed={data.completed} todoData={todoData} setTodoData={setTodoData} provided={provided} snapshot={snapshot} />
								)}
							</Draggable>
						))}
						{provided.placeholder}
					</ul>
				)}
			</Droppable>
		</DragDropContext>
	);
});

export default Lists;

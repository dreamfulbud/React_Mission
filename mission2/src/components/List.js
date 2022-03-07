import React, { useState } from "react";

const List = React.memo(({ id, title, completed, todoData, setTodoData, provided, snapshot }) => {
	const [edited, setEdited] = useState(false);
	const [newText, setNewText] = useState(todoData.title);

	// 삭제
	const handleClick = (id) => {
		let newTodoData = todoData.filter((data) => data.id !== id);
		setTodoData(newTodoData);
	};
	// 완료여부 false/true
	const handleCompleChange = (e, id) => {
		let newTodoData = todoData.map((data) => {
			if (data.id === id) {
				data.completed = !data.completed;
			}
			return data;
		});
		setTodoData(newTodoData);
	};

	//수정클릭
	const handleEdit = (title) => {
		setEdited(true);
		setNewText(title);
	};

	//Upadte
	const handleUpdate = (id) => {
		const newTodoData = [...todoData];
		newTodoData.find((data) => data.id === id).title = newText;
		setTodoData(newTodoData);
		setEdited(false);
	};

	//Enter
	const handleKeyPress = (e) => {
		if (e.key === "Enter") {
			handleUpdate(id, title, completed);
		}
	};

	return (
		<li key={id} {...provided.draggableProps} ref={provided.innerRef} {...provided.dragHandleProps} className={snapshot.isDragging ? "selected" : edited ? "edit" : "not-selected"}>
			{!edited ? (
				<>
					<input type="checkbox" onChange={(e) => handleCompleChange(e, id)} defaultChecked={completed} className={completed ? "check-true" : ""} id={"input" + id} />
					<label htmlFor={"input" + id}>{title}</label>
				</>
			) : (
				<>
					<label htmlFor="edit-input" className="a11y-hidden">
						수정
					</label>
					<input type="text" className="edit-input" id="edit-input" onChange={(e) => setNewText(e.target.value)} onKeyPress={handleKeyPress} value={newText} maxLength={100} />
				</>
			)}

			<div className="btn-group">
				{edited ? (
					<button type="button" onClick={() => handleUpdate(id, title, completed)} className="btn-apply">
						<span className="a11y-hidden">적용</span>
					</button>
				) : (
					<button type="button" onClick={() => handleEdit(title)} className="btn-modify">
						<span className="a11y-hidden">수정</span>
					</button>
				)}

				<button type="button" className="btn-delete" onClick={() => handleClick(id)}>
					<span className="a11y-hidden">삭제</span>
				</button>
			</div>
		</li>
	);
});

export default List;

import React from "react";
import "./form.scss";

export default function Form({ handleSubmit, value, setValue }) {
	const handleChange = (e) => {
		setValue(e.target.value);
	};

	return (
		<form onSubmit={handleSubmit}>
			<input type="text" name="value" placeholder="해야할 일을 입력하세요." value={value} onChange={handleChange} maxLength={100} />
			<input type="submit" value="입력" />
		</form>
	);
}

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./header.scss";

function Header() {
	const [show, setShow] = useState(false);
	const [searchValue, setSearchValue] = useState("");
	const navigate = useNavigate();
	useEffect(() => {
		window.addEventListener("scroll", () => {
			if (window.scrollY > 50) {
				setShow(true);
			} else {
				setShow(false);
			}
		});
		return () => {
			window.removeEventListener("scroll", () => {});
		};
	});

	const handleChange = (e) => {
		setSearchValue(e.target.value);
		navigate(`/search?q=${e.target.value}`);
	};
	return (
		<header className={`header ${show && "nav_black"}`}>
			<h1>
				<a href="/">
					<span className="a11y-hidden">Netflix</span>
				</a>
			</h1>
			<input value={searchValue} onChange={handleChange} className="search-input" type="text" placeholder="영화를 검색해 주세요" />
			<button>
				<span className="a11y-hidden">profile</span>
			</button>
		</header>
	);
}

export default Header;

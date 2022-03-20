import axios from "axios";

const instance = axios.create({
	baseURL: "https://api.themoviedb.org/3",
	params: {
		api_key: "7c758c4366354bdf38ebab0c1a0b175b",
		language: "ko-KR",
	},
});

export default instance;

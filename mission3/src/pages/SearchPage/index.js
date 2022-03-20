import axios from "../../api/axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./searchPage.scss";
import { useDebounce } from "../../hooks/useDebounce";

export default function SearchPage() {
	const navigate = useNavigate();
	const [searchResults, setSearchResults] = useState([]);
	const useQuery = () => {
		return new URLSearchParams(useLocation().search);
	};

	let query = useQuery();
	const searchTerm = query.get("q");
	const debouncedSearchTerm = useDebounce(query.get("q"), 500);

	useEffect(() => {
		if (debouncedSearchTerm) {
			fetchSearchMovie(debouncedSearchTerm);
		}
	}, [debouncedSearchTerm]);

	const fetchSearchMovie = async (debouncedSearchTerm) => {
		try {
			const request = await axios.get(`/search/multi?include_adult=false&query=${debouncedSearchTerm}`);
			setSearchResults(request.data.results);
		} catch (error) {
			console.log("error", error);
		}
	};

	const renderSearchResults = () => {
		return searchResults.length > 0 ? (
			<section className="search-container">
				{searchResults.map((movie) => {
					if (movie.backdrop_path !== null && movie.media_type !== "person") {
						const movieImageUrl = "https://image.tmdb.org/t/p/w500" + movie.backdrop_path;
						return (
							<div className="movie" key={movie.id}>
								<div onClick={() => navigate(`/${movie.id}`)} className="column-poster">
									<img src={movieImageUrl} alt="movie image" className="movie-poster" />
								</div>
							</div>
						);
					}
				})}
			</section>
		) : (
			<section className="no-results">
				<h2>찾는 검색어 "{searchTerm}"에 맞는 영화가 없습니다.</h2>
			</section>
		);
	};

	return renderSearchResults();
}
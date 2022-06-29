import { useState, useEffect } from "react";
import Movie from "../components/Movie";
import styles from "./Home.module.css";

function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [genre, setGenre] = useState("All");
  const [keyword, setKeyword] = useState("");
  const genres = ["All","Action","Adventure","Animation","Biography","Comedy","Crime"	,"Documentary","Drama","Family","Fantasy","Film Noir","History"	,"Horror","Music","Musical","Mystery","Romance","Sci-Fi"	,"Short Film","Sport","Superhero","Thriller","War","Western"];
  
  const onType = (event) => setKeyword(event.target.value); 
  const onSearch = (event) => {
    event.preventDefault();
    getMovies();
  }
  const onGenresChange = (event) => setGenre(event.target.value);;
  const getMovies = async() => {
    setLoading(true);
    let url = `https://yts.mx/api/v2/list_movies.json?minimum_rating=8.5&sort_by=year${genre !== "All" ? `&genre=${genre}` : ``}${keyword !== "" ? `&query_term=${keyword}` : ``}`;
    const json = await (await fetch(url)).json();
    json.data.hasOwnProperty("movies") ? setMovies(json.data.movies) : setMovies([]);
    setLoading(false);
  };
  useEffect(() => {
    getMovies();
  }, [genre]);
  
  return (
    <div className={styles.container}>
      <div className={styles.nav}>
        <label className={styles.genre} htmlFor="genres"><strong>Genre</strong></label>
        <select id="genres" onChange={onGenresChange}>
          {genres.map((g) => <option key={g} value={g}>{g}</option>)}
        </select>
        <form>
        <input onChange={onType} value={keyword} type="text" placeholder="Enter Keyword..."/>
        <button onClick={onSearch}>Search</button>
        </form>
      </div>
      {loading ? (
        <div className={styles.loader}>
            <span>Loading...</span>
        </div>
      ) : (
      <div className={styles.movies}>
        {movies.length > 0 ? movies.map((movie) => (
          <Movie 
            key={movie.id} 
            id={movie.id}
            coverImg={movie.medium_cover_image} 
            title={movie.title_long} 
            summary={movie.summary} 
            genres={movie.genres} />
        )) : <h1>Has No Data</h1>}
      </div>
      )}
    </div>
  );
}

export {Home as default};
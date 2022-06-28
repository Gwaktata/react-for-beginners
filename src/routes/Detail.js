import { useEffect, useState } from "react";
import {useParams} from "react-router-dom";

function Detail() {
    const {id} = useParams();
    const [loading, setLoading] = useState(true);
    const [movie, setMovie] = useState({});
    const getDetail = async () => {
        const json = await (await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)).json();
        setMovie(json.data.movie);
        setLoading(false);
    }
    useEffect(() => {
        getDetail();
    },[]);
    console.log(movie);
    return (
        <div>
            {loading ? (
                <h1>Loading...</h1>
                ) : (
                    <div>
                        <img src={movie.large_cover_image} alt={movie.title} />
                        <h1>{movie.title_long}</h1>
                        <ul>
                            {movie.genres.map((g) => <li key={g}>{g}</li>)}
                        </ul>
                        <p>{movie.description_full}</p>
                    </div>
                )}
        </div>
    )
}

export {Detail as default};
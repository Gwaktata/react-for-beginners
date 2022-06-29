import { useEffect, useState } from "react";
import {useParams} from "react-router-dom";
import styles from "./Home.module.css";
import Point from "../components/Point";

function Detail() {
    const {id} = useParams();
    const [loading, setLoading] = useState(true);
    const [movie, setMovie] = useState({});

    const getDetail = async () => {
        const json = await (await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}&with_cast=true`)).json();
        setMovie(json.data.movie);
        setLoading(false);
    }
    useEffect(() => {
        getDetail();
    },[]);
    
    return (
        <div className={styles.container}>
            {loading ? (
                <div className={styles.loader}>
                    <span>Loading...</span>
                </div>
                ) : (
                    <Point 
                        background_image_original={movie.background_image_original}
                        medium_cover_image={movie.medium_cover_image}
                        url={movie.url}
                        title_long={movie.title_long}
                        rating={movie.rating}
                        runtime={movie.runtime}
                        genres={movie.genres}
                        cast={movie?.cast}
                        download_count={movie.download_count}             
                    />
                )}
        </div>
    )
}

export {Detail as default};
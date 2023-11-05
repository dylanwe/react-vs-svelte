import { useNavigate } from "react-router-dom";
import { useMoviesStore } from "../stores/moviesStore.ts";

export default function Home() {
    const navigate = useNavigate()
    const { favorites } = useMoviesStore()

    return <>
        <h1>Home</h1>
        {favorites.map((x) => <p>{x}, </p>)}
        <button onClick={() => navigate("/detail")}>detail</button>
    </>
}
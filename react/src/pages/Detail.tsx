import { useNavigate } from "react-router-dom";
import { useMoviesStore } from "../stores/moviesStore.ts";
import { useState } from "react";

export default function Detail() {
    const navigate = useNavigate()
    const [input, setInput] = useState<string>("")
    const { favorites, add } = useMoviesStore()

    function addFavorite() {
        const idAsNum = parseInt(input)
        if (idAsNum) {
            add(idAsNum)
            setInput("")
        }
    }

    return <>
        <h1>Add</h1>
        <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
        />
        {favorites.map((x) => <p>{x}, </p>)}
        <button onClick={() => navigate("/")}>home</button>
        <button onClick={() => addFavorite()}>add</button>
    </>
}

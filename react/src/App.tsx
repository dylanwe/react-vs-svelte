import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.tsx";
import Detail from "./pages/Detail.tsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<Home />} />
                <Route path={"/detail"} element={<Detail />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App

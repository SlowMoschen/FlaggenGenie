import { useNavigate } from "react-router-dom";
import Header from "../../shared/components/Header";
import MainDotMenu from "./components/DotMenu";

export default function Home() {
    const redirect = useNavigate();

    return (
        <>
        <Header title="Home" dotMenu={<MainDotMenu />}/>
        <button onClick={() => redirect("/index-cards")}>Index Cards</button>
        </>
    );
}
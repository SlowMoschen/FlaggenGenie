import { useNavigate } from "react-router-dom";
import Header from "../../shared/components/Header";

export default function Home() {
    const redirect = useNavigate();

    return (
        <>
        <Header title="Home" />
        <button onClick={() => redirect("/index-cards")}>Index Cards</button>
        </>
    );
}
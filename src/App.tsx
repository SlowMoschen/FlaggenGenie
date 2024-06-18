import { useEffect, useState } from "react";
import { useAppContext } from "./Context";
import Deck from "./components/Deck";
import { LoadingScreen } from "./components/LoadingScreen";
import Header from "./components/Header";

function App() {
  const { decks } = useAppContext();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 800);
  }, []);

  if (!isLoaded) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Header />
      <Deck decks={decks} />
    </>
  );
}

export default App;

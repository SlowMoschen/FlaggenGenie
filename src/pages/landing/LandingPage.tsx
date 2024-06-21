import { useState } from "react";
import { useAppStorage } from "../../shared/hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";
import { REDIRECTS } from "../../shared/configs/redirectLinks";

export default function Landing() {
  const { storeState } = useAppStorage();
  const [username, setUsername] = useState<string>("");
  const redirect = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    storeState({ username, language: "en" });
    redirect(REDIRECTS.HOME);
  };

  return (
    <div>
      <h1>Landing Page</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button>Save</button>
      </form>
    </div>
  );
}

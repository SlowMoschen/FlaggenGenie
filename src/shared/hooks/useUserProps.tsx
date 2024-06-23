import { useEffect, useState } from "react";
import { useAppStorage } from "./useAppStorage";

export function useUserProps() {
    const { getStoredItem } = useAppStorage();
    const [name, setName] = useState<string>(getStoredItem("name") || "");
    const [status, setStatus] = useState<string>(getStoredItem("status") || "");
    const [avatar, setAvatar] = useState<string>(getStoredItem("avatar") || "");
    const [language, setLanguage] = useState<string>(getStoredItem("language") || "en");


    useEffect(() => {
        setName(getStoredItem("name") || "");
        setStatus(getStoredItem("status") || "");
        setAvatar(getStoredItem("avatar") || "");
        setLanguage(getStoredItem("language") || "en");  
    }, [name, status, avatar, language, getStoredItem]);

    return { name, status, avatar, language };
}
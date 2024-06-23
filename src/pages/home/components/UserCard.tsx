import { useTranslation } from "react-i18next";
import Button from "../../../shared/components/Button";
import Dialog from "../../../shared/components/Dialog";
import { useEffect, useState } from "react";
import { useUserProps } from "../../../shared/hooks/useUserProps";
import AvatarIcon from "../../../shared/components/AvatarIcon";
import { arrow } from "../../../assets";
import { useAppStorage } from "../../../shared/hooks/useAppStorage";
import { useDebouncedCallback } from "use-debounce";

interface UserCardProps {
  className?: string;
}

function AvatarList() {
  const { storeItem } = useAppStorage();
  const { avatar } = useUserProps();
  const avatars = Array.from({ length: 20 }, (_, i) => `/avatars/avatar-${i + 1}.svg`);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(0);

  const handleAvatarChange = (index: number) => {
    setSelectedAvatar(index);
    storeItem("avatar", avatars[index]);
  };

  useEffect(() => {
    setSelectedAvatar(avatars.indexOf(avatar));
  }, [storeItem, avatars, avatar]);

  return (
    <>
      <AvatarIcon avatar={avatars[selectedAvatar]} iconSize="large" />
      <div className="w-full">
        <div
          className={`flex flex-wrap gap-2 p-2 justify-center items-center overflow-hidden ${
            isExpanded ? "h-[340px]" : "h-20"
          } transition-all duration-300`}
        >
          {avatars.map((avatar, index) => (
            <AvatarIcon
              key={index}
              avatar={avatar}
              iconSize="small"
              onClick={() => handleAvatarChange(index)}
              className={selectedAvatar === index ? "ring-4 ring-green-300" : ""}
            />
          ))}
        </div>
        <Button
          variant="secondary"
          buttonSize="small"
          className="mt-4 w-full flex justify-center"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <img
            src={arrow}
            alt="arrow"
            className={`h-4 w-4 transform ${isExpanded ? "rotate-90" : "-rotate-90"}`}
          />
        </Button>
      </div>
    </>
  );
}

function EditProfileDialog() {
  const { t } = useTranslation("home");
  const { name, status } = useUserProps();
  const [formProps, setFormProps] = useState({ name, status });
  const { storeItem } = useAppStorage();

  const debounceStoreState = useDebouncedCallback((value: { name: string; status: string }) => {
    storeItem("name", value.name);
    storeItem("status", value.status);
  }, 300);

  const handleInputChange = (key: "name" | "status", value: string) => {
    if (value.length === 0) {
      setFormProps({ ...formProps, [key]: "" });
      return;
    }

    setFormProps({ ...formProps, [key]: value });
    debounceStoreState({ ...formProps, [key]: value });
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <AvatarList />
      <div className="w-full">
        <label htmlFor="name" className="text-white flex justify-between">
          {t("settings.username")}
          <span>
            <small>{formProps.name.length}/15</small>
          </span>
        </label>
        <input
          type="text"
          id="name"
          value={formProps.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          className="w-full p-2 mt-2 outline-background-800"
          maxLength={15}
        />
      </div>
      <div className="w-full">
        <label htmlFor="status" className="text-white flex justify-between">
          {t("settings.status")}
          <span>
            <small>{formProps.status.length}/25</small>
          </span>
        </label>
        <input
          type="text"
          id="status"
          value={formProps.status}
          onChange={(e) => handleInputChange("status", e.target.value)}
          className="w-full p-2 mt-2 outline-background-800"
          maxLength={25}
        />
      </div>
    </div>
  );
}

export default function UserCard({ className }: UserCardProps) {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const { name, status, avatar } = useUserProps();

  return (
    <div
      className={`flex flex-col lg:flex-row items-center justify-evenly gap-4 bg-background-800 rounded-lg shadow-md shadow-background-500 p-5 ${className}`}
    >
      <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <EditProfileDialog />
      </Dialog>
      <div className="flex items-center gap-4">
        <AvatarIcon avatar={avatar} iconSize="medium" />
        <div>
          <h2 className="text-xl font-bold text-white">{name}</h2>
          <p className="text-sm text-gray-400">{status}</p>
        </div>
      </div>
      <Button variant="primary" buttonSize="medium" onClick={() => setIsOpen(true)}>
        {i18n.language === "en" ? `${t("button.edit")} Profile` : `Profil ${t("button.edit")}`}
      </Button>
    </div>
  );
}

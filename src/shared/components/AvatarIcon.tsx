interface AvatarIconProps {
  avatar: string;
  iconSize?: "small" | "medium" | "large";
  onClick?: () => void;
  className?: string;
}

export default function AvatarIcon({ avatar, iconSize, onClick, className }: AvatarIconProps) {
  const defaultAvatar = "/avatars/avatar-1.svg";

  const iconSizes = {
    small: "w-12 h-12",
    medium: "w-24 h-24",
    large: "w-32 h-32",
  }[iconSize || "medium"];

  return (
    <div
      className={`relative flex items-center gap-4 bg-background-300 rounded-full p-1 ${
        onClick ? "cursor-pointer" : ""
      } ${className}`}
      onClick={onClick}
    >
      <img src={avatar || defaultAvatar} alt="avatar" className={`rounded-full ${iconSizes}`} />
    </div>
  );
}

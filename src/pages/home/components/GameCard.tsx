import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

interface GameCardProps {
  icon: string;
  title: string;
  linkTo: string;
  className?: string;
  disabled?: boolean;
}

export default function GameCard({ icon, title, linkTo, className, disabled }: GameCardProps) {
  const { t } = useTranslation();

  const disabledClass = disabled
    ? "opacity-50"
    : "hover:shadow-lg active:shadow-inner hover:bg-text-800";

  if (disabled)
    return (
      <div
        className={`flex flex-col items-center text-center justify-center w-full h-full p-4 bg-background-900 rounded-lg shadow-md shadow-background-500 ${disabledClass} ${className}`}
      >
        <img src={icon} alt={title} className="w-14 h-14" />
        <h3 className="mt-4 text-xl font-semibold text-gray-800">
          {
            t("comingSoon")
          }
        </h3>
      </div>
    );

  return (
    <Link to={linkTo} className={`w-full h-full ${className}`}>
      <div
        className={`flex flex-col items-center text-center justify-center w-full h-full p-4 bg-background-900 rounded-lg shadow-md shadow-background-500 ${disabledClass}`}
      >
        <img src={icon} alt={title} className="w-14 h-14" />
        <h3 className="mt-4 text-xl font-semibold text-gray-800">{title}</h3>
      </div>
    </Link>
  );
}

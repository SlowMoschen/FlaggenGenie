interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  buttonSize: "xsmall" | "small" | "medium" | "large" | "icon";
  variant: "primary" | "secondary" | "game-primary" | "game-secondary" | "icon";
  children: React.ReactNode;
}

export default function Button({ onClick, buttonSize, variant, children, disabled, className }: ButtonProps) {
  const baseStyles = "rounded";

  const buttonSizes = {
    xsmall: "py-1 px-2 text-xs",
    small: "py-1 px-4 text-sm",
    medium: "py-2 px-6 text-base",
    large: "py-3 px-8 text-lg",
    icon: "p-2 rounded-full",
  };

  const buttonVariants = {
    primary: "bg-blue-500 text-white",
    secondary: "bg-gray-300 text-gray-800",
    "game-primary": "bg-green-500 text-white",
    "game-secondary": "bg-red-500 text-white",
    icon: "bg-transparent text-gray-800",
  };

  const hoverStyles = {
    primary: "hover:bg-blue-600",
    secondary: "hover:bg-gray-400",
    "game-primary": "hover:bg-green-600",
    "game-secondary": "hover:bg-red-600",
    icon: "hover:bg-gray-400",
  }[variant];

  const disabledStyles = "opacity-50 cursor-default";

  const styles = `${baseStyles} ${buttonSizes[buttonSize]} ${buttonVariants[variant]} ${
    disabled ? disabledStyles : ""
  } ${hoverStyles} hover:transform hover:-translate-y-0.5 transition-transform ${className}`;

  return (
    <button onClick={onClick} className={styles}>
      {children}
    </button>
  );
}

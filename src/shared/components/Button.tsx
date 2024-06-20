interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  buttonSize: "xsmall" | "small" | "medium" | "large";
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
  };

  const buttonVariants = {
    primary: "bg-primary-500 font-bold tracking-wider",
    secondary: "bg-secondary-700 font-semibold tracking-wider",
    "game-primary": "bg-green-500 font-bold",
    "game-secondary": "bg-red-500 font-bold",
    icon: "bg-transparent text-secondary-800 font-bold",
  };

  const hoverStyles = {
    primary: "hover:bg-primary-600",
    secondary: "hover:bg-secondary-400",
    "game-primary": "hover:bg-green-600",
    "game-secondary": "hover:bg-red-600",
    icon: "hover:bg-secondary-400",
  }

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

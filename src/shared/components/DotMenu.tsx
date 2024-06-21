interface DotMenuProps {
  children: React.ReactNode;
}

export default function DotMenu({ children }: DotMenuProps) {
  return (
    <div
      className={`dot-menu flex flex-col gap-2 p-3 absolute z-50 top-16 right-3 bg-background-800 rounded`}
    >
      {children}
    </div>
  );
}

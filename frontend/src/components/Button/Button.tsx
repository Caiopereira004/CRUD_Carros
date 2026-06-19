interface Props {
  text: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export function Button({
  text,
  onClick,
  type = "button",
  disabled = false
}: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
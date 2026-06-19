interface Props {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export function InputField({
  label,
  value,
  onChange
}: Props) {
  return (
    <div>
      <label>{label}</label>

      <input
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
      />
    </div>
  );
}
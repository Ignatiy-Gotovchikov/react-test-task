interface CheckboxProps {
  onChange: () => void;
  checked?: boolean;
}

export const Checkbox = ({ onChange, checked }: CheckboxProps) => {
  return (
    <input 
      type="checkbox" 
      onChange={onChange} 
      checked={checked} 
    />
  );
};

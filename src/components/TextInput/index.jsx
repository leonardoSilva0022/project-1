import "./styles.css";

export const TextInput = ({ actionFn, inputValue }) => {
  return (
    <input
      className="text-input"
      type="search"
      value={actionFn}
      onChange={inputValue}
    />
  );
};

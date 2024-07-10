import Select from "react-select";
import { useAppContext } from "@/components/context/AppSessionContextProvider";
import { selectClassnames, resetSelectStyles } from "./selectStyles";

function CustomSelect({
  value,
  classname,
  options,
  onChange,
  placeholder = "Selecciona...",
}) {
  useAppContext();

  return (
    <Select
      className={classname}
      classNames={selectClassnames}
      styles={resetSelectStyles}
      options={options}
      onChange={onChange}
      placeholder={placeholder}
      value={value}
    />
  );
}

export default CustomSelect;

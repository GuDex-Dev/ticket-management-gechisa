import Select from "react-select";
import { useAppContext } from "@/components/context/AppSessionContextProvider";
import { selectClassnames, resetSelectStyles } from "./selectStyles";

function CustomSelect({
  classname,
  defaultValue,
  onChange,
  options,
  field,
  maxMenuHeight,
  loadingMessage = "Cargando...",
  placeholder = "Selecciona...",
}) {
  useAppContext();

  if (field) {
    const { value, onChange, ...rest } = field;

    const handleChange = (value) => {
      onChange();
      form.setValue("origin_city_id", value.value);
    };

    return (
      <Select
        {...rest}
        className={classname}
        classNames={selectClassnames}
        styles={resetSelectStyles}
        options={options}
        onChange={handleChange}
        defaultValue={defaultValue}
        maxMenuHeight={maxMenuHeight}
        loadingMessage={() => loadingMessage}
        placeholder={placeholder}
      />
    );
  } else {
    return (
      <Select
        className={classname}
        classNames={selectClassnames}
        styles={resetSelectStyles}
        options={options}
        onChange={onChange}
        defaultValue={defaultValue}
        maxMenuHeight={maxMenuHeight}
        loadingMessage={() => loadingMessage}
        placeholder={placeholder}
      />
    );
  }
}

export default CustomSelect;

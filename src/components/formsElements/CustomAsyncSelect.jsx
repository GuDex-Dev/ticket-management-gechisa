import AsyncSelect from "react-select/async";
import { useAppContext } from "@/components/context/AppSessionContextProvider";
import { selectClassnames, resetSelectStyles } from "./selectStyles";

function CustomAsyncSelect({
  defaultValue,
  defaultOptions,
  loadOptions,
  isDisabled,
  isLoading,
  maxMenuHeight,
  field,
  onChange,
}) {
  useAppContext();

  return (
    <AsyncSelect
      {...field}
      classNames={selectClassnames}
      styles={resetSelectStyles}
      loadOptions={loadOptions}
      defaultValue={defaultValue}
      defaultOptions={defaultOptions}
      onChange={
        field
          ? (option) => field.onChange(option ? option.value : null)
          : onChange
      }
      isDisabled={isDisabled}
      isLoading={isLoading}
      maxMenuHeight={maxMenuHeight}
      loadingMessage={() => "Cargando..."}
      placeholder="Selecciona..."
    />
  );
}

export default CustomAsyncSelect;

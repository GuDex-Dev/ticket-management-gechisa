import AsyncSelect from "react-select/async";
import { useAppContext } from "@/components/context/AppSessionContextProvider";
import { selectClassnames, resetSelectStyles } from "./selectStyles";

function CustomAsyncSelect({
  defaultOptions,
  loadOptions,
  isDisabled,
  isLoading,
  maxMenuHeight,
  field,
}) {
  useAppContext();

  return (
    <AsyncSelect
      {...field}
      classNames={selectClassnames}
      styles={resetSelectStyles}
      loadOptions={loadOptions}
      defaultOptions={defaultOptions}
      isDisabled={isDisabled}
      isLoading={isLoading}
      maxMenuHeight={maxMenuHeight}
      loadingMessage={() => "Cargando..."}
      placeholder="Selecciona..."
    />
  );
}

export default CustomAsyncSelect;

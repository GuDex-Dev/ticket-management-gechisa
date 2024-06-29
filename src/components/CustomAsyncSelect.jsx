import AsyncSelect from "react-select/async";
import { useAppContext } from "@/components/context/AppSessionContextProvider";

const selectClassnames = {
  control: (state) =>
    `border ${state.isFocused ? "border-primary" : "border-border"} hover:border-primary ${state.isDisabled ? "bg-muted text-muted-foreground" : "bg-card text-foreground"}`,
  input: (state) => `text-foreground`,
  placeholder: (state) => `text-muted-foreground`,
  dropdownIndicator: (state) => `text-muted-foreground`,
  indicatorSeparator: (state) => `bg-border`,
  loadingIndicator: (state) => ``,
  loadingMessage: (state) => ``,
  menu: (state) => `bg-card border border-border`,
  menuList: (state) =>
    `overflow-y-auto relative overflow-scroll-touch pb-1 pt-1 box-border menuList-scrollbar`,
  option: (state) =>
    `${state.isSelected ? "bg-primary text-primary-foreground" : "hover:bg-input"} cursor-pointer active:bg-primary active:text-primary-foreground px-2 py-1`,
  noOptionsMessage: (state) => ``,
};

const resetSelectStyles = {
  control: (baseStyles) => {
    return {
      ...baseStyles,
      backgroundColor: "",
      borderColor: "",
      "&:hover": {
        borderColor: "",
      },
      borderWidth: "",
      boxShadow: "",
    };
  },
  input: (baseStyles) => {
    return { ...baseStyles, color: "" };
  },
  placeholder: (baseStyles) => {
    return { ...baseStyles, color: "" };
  },
  singleValue: (baseStyles) => {
    return { ...baseStyles, color: "" };
  },
  dropdownIndicator: (baseStyles) => {
    return {
      ...baseStyles,
      color: "",
      ":hover": {
        color: "",
      },
    };
  },
  indicatorSeparator: (baseStyles) => {
    return { ...baseStyles, backgroundColor: "" };
  },
  loadingIndicator: (baseStyles) => {
    return { ...baseStyles, color: "" };
  },
  loadingMessage: (baseStyles) => {
    return { ...baseStyles, color: "" };
  },
  menu: (baseStyles) => {
    return { ...baseStyles, backgroundColor: "" };
  },
  menuList: (baseStyles) => {
    return {
      ...baseStyles,
      overflowY: "auto",
      position: "relative",
      WebkitOverflowScrolling: "touch",
      paddingBottom: 4,
      paddingTop: 4,
      boxSizing: "border-box",
    };
  },
  option: (baseStyles) => {
    return {
      ":active:": {
        backgroundColor: "", //transparent
      },
      backgroundColor: "", //transparent
      color: "", //inherit
      cursor: "", //default
      fontFamily: "monospace",
      fontSize: "1rem",
    };
  },
  noOptionsMessage: (baseStyles) => {
    return { ...baseStyles, color: "" };
  },
};

function CustomAsyncSelect({
  defaultValue,
  defaultOptions,
  onChange,
  loadOptions,

  isDisabled,
  isLoading,
  maxMenuHeight,
}) {
  useAppContext();

  return (
    <AsyncSelect
      classNames={selectClassnames}
      styles={resetSelectStyles}
      onChange={onChange}
      loadOptions={loadOptions}
      defaultValue={defaultValue}
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

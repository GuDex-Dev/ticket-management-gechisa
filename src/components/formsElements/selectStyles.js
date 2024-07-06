export const selectClassnames = {
  control: (state) =>
    `border ${state.isFocused ? "border-primary" : "border-border"} hover:border-primary ${state.isDisabled ? "bg-muted text-muted-foreground" : "bg-card text-foreground"}`,
  input: (state) => `text-foreground`,
  placeholder: (state) => `text-muted-foreground`,
  dropdownIndicator: (state) => `text-muted-foreground hidden`,
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

export const resetSelectStyles = {
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
      display: "none",
    };
  },
  indicatorSeparator: (baseStyles) => {
    return { ...baseStyles, backgroundColor: "", display: "none" };
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

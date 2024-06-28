import AsyncSelect, { useAsync } from "react-select/async";
import { useAppContext } from "./context/AppSessionContextProvider";

const selectStyles = {
  control: (baseStyles, state) => {
    const isLightTheme = document.body.className.includes("light");

    return {
      ...baseStyles,
      display: "flex",
      alignItems: "center",
      borderColor: state.isFocused
        ? isLightTheme
          ? "#fbbf24" // primary color for light theme
          : "#f59e0b" // primary color for dark theme
        : isLightTheme
          ? "#d1d5db" // input border color for light theme
          : "#a3a3a3", // input border color for dark theme
      backgroundColor: isLightTheme ? "#ffffff" : "#1f2937", // background color
      borderRadius: "0.375rem", // rounded-md
      boxShadow: state.isFocused
        ? `0 0 0 2px ${isLightTheme ? "#fbbf24" : "#f59e0b"}` // ring color
        : "none",
      padding: "0.2rem", // padding
      "&:hover": {
        borderColor: isLightTheme ? "#fbbf24" : "#f59e0b", // hover border color
      },
      ...(state.isDisabled && {
        backgroundColor: isLightTheme ? "#f9fafb" : "#374151",
        borderColor: isLightTheme ? "#e5e7eb" : "#4b5563",
        cursor: "not-allowed",
        opacity: "0.6",
      }),
    };
  },
  input: (baseStyles) => {
    const isLightTheme = document.body.className.includes("light");

    return {
      ...baseStyles,
      color: isLightTheme ? "#111827" : "#fbbf24", // foreground color
    };
  },
  menu: (baseStyles) => {
    const isLightTheme = document.body.className.includes("light");

    return {
      ...baseStyles,
      backgroundColor: isLightTheme ? "#ffffff" : "#374151", // card background color
      borderColor: isLightTheme ? "#d1d5db" : "#a3a3a3", // input border color
      marginTop: "0.25rem", // margin top
      borderRadius: "0.375rem", // rounded-md
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // shadow-lg
    };
  },
  option: (baseStyles, state) => {
    const isLightTheme = document.body.className.includes("light");

    return {
      ...baseStyles,
      cursor: "pointer", // cursor-pointer
      padding: "0.2rem 0.5rem", // padding
      fontFamily: "monospace",
      fontSize: "1rem",
      backgroundColor: state.isSelected
        ? isLightTheme
          ? "#fbbf24" // primary color for selected option
          : "#f59e0b" // primary color for selected option in dark theme
        : isLightTheme
          ? "#ffffff" // card background color
          : "#374151", // card background color for dark theme
      color: state.isSelected
        ? "#ffffff" // text color for selected option
        : isLightTheme
          ? "#111827" // foreground color
          : "#fbbf24", // foreground color for dark theme
      "&:hover": {
        backgroundColor: state.isFocused
          ? isLightTheme
            ? "#f3f4f6" // secondary background color for light theme
            : "#4b5563" // secondary background color for dark theme
          : isLightTheme
            ? "#ffffff" // card background color
            : "#374151", // card background color for dark theme
      },
    };
  },
  placeholder: (baseStyles) => {
    const isLightTheme = document.body.className.includes("light");

    return {
      ...baseStyles,
      color: isLightTheme ? "#6b7280" : "#9ca3af", // muted foreground color
    };
  },
  singleValue: (baseStyles) => {
    const isLightTheme = document.body.className.includes("light");

    return {
      ...baseStyles,
      color: isLightTheme ? "#111827" : "#e5e7eb", // foreground color
    };
  },
  multiValue: (baseStyles) => {
    const isLightTheme = document.body.className.includes("light");

    return {
      ...baseStyles,
      backgroundColor: isLightTheme ? "#e5e7eb" : "#4b5563", // secondary background color
      color: isLightTheme ? "#374151" : "#d1d5db", // secondary foreground color
      borderRadius: "9999px", // rounded-full
      padding: "0.25rem 0.5rem", // padding
    };
  },
  multiValueLabel: (baseStyles) => {
    const isLightTheme = document.body.className.includes("light");

    return {
      ...baseStyles,
      color: isLightTheme ? "#374151" : "#d1d5db", // secondary foreground color
    };
  },
  multiValueRemove: (baseStyles) => {
    const isLightTheme = document.body.className.includes("light");

    return {
      ...baseStyles,
      color: isLightTheme ? "#374151" : "#d1d5db", // secondary foreground color
      "&:hover": {
        backgroundColor: isLightTheme ? "#ef4444" : "#991b1b", // destructive background color
        color: "#ffffff", // destructive foreground color
      },
      borderRadius: "9999px", // rounded-full
      padding: "0.25rem", // padding
      cursor: "pointer", // cursor-pointer
    };
  },
};

function CustomAsyncSelect({
  loadOptions,
  onChange,
  defaultValue,
  isDisabled,
  defaultOptions,
  isLoading,
  isTest = false,
  maxMenuHeight,
}) {
  // const { isLoading } = useAsync();
  useAppContext();
  if (isTest) {
    return (
      <AsyncSelect
        classNames={{
          container: (state) => "border-8 border-green-900 text-black",
          control: (state) => "text-black",
          placeholder: (state) =>
            "border-8 border-blue-900 bg-blue-600 text-black p-4",
          input: (state) =>
            "border-8 border-blue-900 bg-blue-600 text-black p-4",
          singleValue: (state) =>
            "border-8 border-blue-900 bg-blue-600 text-black p-4",
          indicatorSeparator: (state) =>
            "border-8 border-blue-900 bg-blue-600 text-black p-4",
          dropdownIndicator: (state) =>
            "border-8 border-blue-900 bg-blue-600 text-black p-4",
          menu: (state) =>
            "border-8 border-blue-900 bg-blue-600 text-black p-4",
          option: (state) =>
            "border-8 border-blue-900 bg-blue-600 text-black p-4",
          // loadingIndicator: (state) =>
          //   "border-8 border-red-900 bg-red-600 text-black p-4",
          // loadingMessage: (state) =>
          //   "border-8 border-blue-900 bg-blue-600 text-black p-4",
          menuList: (state) =>
            "border-8 border-blue-900 bg-blue-600 text-black p-4",
          indicatorsContainer: (state) =>
            "border-8 border-blue-900 bg-blue-600 text-black p-4",
          valueContainer: (state) =>
            "border-8 border-blue-900 bg-blue-600 text-black p-4",
          multiValueLabel: (state) =>
            "border-8 border-blue-900 bg-blue-600 text-black p-4",
          multiValueRemove: (state) =>
            "border-8 border-blue-900 bg-blue-600 text-black p-4",
          noOptionsMessage: (state) =>
            "border-8 border-blue-900 bg-blue-600 text-black p-4",
          menuPortal: (state) =>
            "border-8 border-blue-900 bg-blue-600 text-black p-4",
        }}
        loadOptions={loadOptions}
        onChange={onChange}
        defaultValue={defaultValue}
        isDisabled={isDisabled}
        defaultOptions={defaultOptions}
      />
    );
  }

  // console.log("isLoading:", isLoading);

  return (
    <AsyncSelect
      styles={selectStyles}
      loadOptions={loadOptions}
      onChange={onChange}
      defaultValue={defaultValue}
      isDisabled={isDisabled}
      defaultOptions={defaultOptions}
      isLoading={isLoading}
      maxMenuHeight={maxMenuHeight}
    />
  );
}

export default CustomAsyncSelect;

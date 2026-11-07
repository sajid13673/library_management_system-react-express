import React from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = React.forwardRef(
  (
    {
      value,
      onChange,
      onSubmit,
      placeholder = "Search...",
      ariaLabel = "search records",
      minWidth = 180,
      sx = {},
      ...rest
    },
    ref,
  ) => {
    const handleSubmit = (event) => {
      if (onSubmit) {
        event.preventDefault();
        onSubmit(event);
      }
    };

    const InputComponent = (
      <TextField
        size="small"
        inputRef={ref}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        variant="outlined"
        InputProps={{
          "aria-label": ariaLabel,
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                type={onSubmit ? "submit" : "button"}
                edge="end"
                sx={{ color: "action.active" }}
              >
                <SearchIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{
          minWidth: minWidth,
          "& .MuiOutlinedInput-root": {
            borderRadius: 2,
            backgroundColor: "background.paper",
            transition: "box-shadow 0.2s, border-color 0.2s",
            "&:hover": {
              backgroundColor: "action.hover",
            },
          },
          ...sx,
        }}
        {...rest}
      />
    );

    if (onSubmit) {
      return (
        <form
          onSubmit={handleSubmit}
          noValidate
          style={{ display: "contents" }}
        >
          {InputComponent}
        </form>
      );
    }

    return InputComponent;
  },
);

SearchBar.displayName = "SearchBar";

export default SearchBar;

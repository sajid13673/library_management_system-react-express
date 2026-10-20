import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";

const CustomSelect = React.forwardRef(
  (
    {
      value,
      onChange,
      label = "Sort by",
      options = [
        { value: "createdAt-desc", label: "New to old" },
        { value: "createdAt-asc", label: "Old to new" },
      ],
      minWidth = 160,
      sx = {},
      ...rest
    },
    ref,
  ) => {
    // Create a safe, unique HTML fallback ID string from the label name
    const labelId = `${label.toLowerCase().replace(/\s+/g, "-")}-label`;

    const handleChange = (event) => {
      onChange(event.target.value);
    };

    return (
      <FormControl
        size="small"
        ref={ref}
        sx={{
          minWidth: minWidth,
          "& .MuiInputLabel-root": { fontSize: "0.875rem" },
          ...sx, // Allows overriding or passing custom layout spacing margins
        }}
        {...rest}
      >
        <InputLabel id={labelId}>{label}</InputLabel>
        <Select
          labelId={labelId}
          id={`${labelId}-select`}
          value={value}
          label={label}
          onChange={handleChange}
          startAdornment={
            <SortIcon fontSize="small" sx={{ color: "action.active", mr: 1 }} />
          }
          sx={{
            borderRadius: 2,
            fontSize: "0.875rem",
            backgroundColor: "background.paper",
          }}
        >
          {options.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  },
);

CustomSelect.displayName = "CustomSelect";

export default CustomSelect;

import { Visibility, VisibilityOff } from "@material-ui/icons";
import {
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import React, { useState } from "react";

function PasswordField({ label, name, value, onChange, error }) {
  const [showPassword, setShowPassword] = useState(false);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <FormControl>
      <InputLabel htmlFor="my-input">{label}</InputLabel>
      <Input
        error={error}
        name={name}
        type={showPassword ? "text" : "password"}
        aria-describedby="my-helper-text"
        value={value}
        onChange={onChange}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setShowPassword(!showPassword)}
              onMouseDown={handleMouseDownPassword}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
      {error ? <div className="error">{error}</div> : null}
    </FormControl>
  );
}

export default PasswordField;

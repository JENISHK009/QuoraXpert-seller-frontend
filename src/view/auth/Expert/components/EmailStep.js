import React from "react";
import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";

const EmailStep = ({ control, errors }) => (
  <Controller
    name="email"
    control={control}
    rules={{
      required: "Email is required",
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "Invalid email address",
      },
    }}
    render={({ field }) => (
      <TextField
        {...field}
        fullWidth
        id="email"
        label="Email"
        error={!!errors.email}
        helperText={errors.email?.message}
        InputProps={{
          startAdornment: (
            <EmailIcon color="primary" style={{ marginRight: "8px" }} />
          ),
        }}
      />
    )}
  />
);

export default EmailStep;

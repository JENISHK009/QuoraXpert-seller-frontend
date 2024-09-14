import React from "react";
import { Box, InputAdornment, TextField, SxProps } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/system";
import ClearIcon from "@mui/icons-material/Clear";
import { Theme } from "@emotion/react";

const StyledTextField = styled(TextField)(({ theme }) => ({
  width: "100%",
  "& .MuiOutlinedInput-root": {
    height: "50px",
    borderRadius: "10px",
    paddingRight: "5px",
    fontSize: "14px",
    fontFamily: "Poppins Medium",
    "&:hover fieldset": {
      borderColor: "#0069BF",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#0069BF",
    },
    "& .MuiInputBase-input::placeholder": {
      color: "#6A6A6A",
      opacity: 1,
      fontSize: "14px",
      fontFamily: "Poppins Medium",
    },
  },
}));

const AdornmentBox = styled(Box)(({}) => ({
  backgroundColor: "#0069BF",
  borderRadius: "10px",
  padding: "10px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const StyledSearchIcon = styled(SearchIcon)(({}) => ({
  color: "#fff",
  width: "20px",
  height: "20px",
}));

const StyledClearIcon = styled(ClearIcon)(({}) => ({
  color: "#fff",
  width: "20px",
  height: "20px",
  cursor: "pointer",
}));

const SearchComponent = ({
  handleOnChange,
  name,
  value,
  handleClear,
  sx,
  placeholder,
  isIcon = false,
  isHideIcon = false,
  handleSearchClickIcon,
  handleSearchKeyDown = () => {},
}) => {
  return (
    <StyledTextField
      sx={sx}
      onChange={handleOnChange}
      onKeyDown={(e) => handleSearchKeyDown(e)}
      name={name}
      value={value}
      variant="outlined"
      placeholder={placeholder}
      autoComplete="off"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {!isHideIcon ? (
              <AdornmentBox>
                {isIcon ? (
                  <StyledSearchIcon
                    sx={{ cursor: "pointer" }}
                    onClick={handleSearchClickIcon}
                  />
                ) : (
                  <>
                    {value !== "" ? (
                      <StyledClearIcon onClick={handleClear} />
                    ) : (
                      <StyledSearchIcon />
                    )}
                  </>
                )}
              </AdornmentBox>
            ) : (
              ""
            )}
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchComponent;

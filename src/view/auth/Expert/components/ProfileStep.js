import React, { useState } from "react";
import { Controller } from "react-hook-form";
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  OutlinedInput,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ButtonComponent from "../../../../component/Core/ButtonComponent";

const roles = [
  { id: "1", name: "Student" },
  { id: "66d4b450ee639042f6816f17", name: "Expert" },
];

const ProfileStep = ({ control, errors, categoriesData }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [selectedNestedSubcategories, setSelectedNestedSubcategories] =
    useState([]);

  const handleCategoryChange = (event, onChange) => {
    const selectedCategoryIds = event.target.value;
    setSelectedCategories(selectedCategoryIds);
    setSelectedSubcategories([]);
    setSelectedNestedSubcategories([]);
    onChange(selectedCategoryIds);
  };

  const handleSubcategoryChange = (event, onChange) => {
    const selectedSubcategoryIds = event.target.value;
    setSelectedSubcategories(selectedSubcategoryIds);
    setSelectedNestedSubcategories([]);
    onChange(selectedSubcategoryIds);
  };

  return (
    <>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Controller
          name="name"
          control={control}
          rules={{ required: "Name is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Name"
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          )}
        />
        <Controller
          name="gender"
          control={control}
          rules={{ required: "Gender is required" }}
          render={({ field }) => (
            <FormControl fullWidth>
              <InputLabel>Gender</InputLabel>
              <Select {...field} label="Gender">
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
          )}
        />
      </Box>

      <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
        <Controller
          name="roleId"
          control={control}
          rules={{ required: "Role is required" }}
          render={({ field }) => (
            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select {...field} label="Role">
                {roles.map((role) => (
                  <MenuItem key={role.id} value={role.id}>
                    {role.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />
        <Controller
          name="categoryIds"
          control={control}
          rules={{ required: "At least one category is required" }}
          render={({ field }) => (
            <FormControl fullWidth>
              <InputLabel>Categories</InputLabel>
              <Select
                {...field}
                multiple
                input={<OutlinedInput label="Categories" />}
                renderValue={(selected) =>
                  selected
                    .map(
                      (id) =>
                        categoriesData.find((cat) => cat._id === id)
                          ?.categoryName
                    )
                    .join(", ")
                }
                onChange={(e) => handleCategoryChange(e, field.onChange)}
                value={field.value || []}
              >
                {categoriesData?.map((category) => (
                  <MenuItem key={category._id} value={category._id}>
                    <Checkbox
                      checked={(field.value || []).indexOf(category._id) > -1}
                    />
                    <ListItemText primary={category.categoryName} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />
      </Box>

      <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
        <Controller
          name="subcategoryIds"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth>
              <InputLabel>Subcategories</InputLabel>
              <Select
                {...field}
                multiple
                input={<OutlinedInput label="Subcategories" />}
                renderValue={(selected) =>
                  selected
                    .map(
                      (id) =>
                        selectedCategories
                          .flatMap(
                            (catId) =>
                              categoriesData.find((cat) => cat._id === catId)
                                ?.subcategories || []
                          )
                          .find((sub) => sub._id === id)?.subCategoryName
                    )
                    .filter(Boolean)
                    .join(", ")
                }
                onChange={(e) => handleSubcategoryChange(e, field.onChange)}
                value={field.value || []}
              >
                {selectedCategories
                  .flatMap(
                    (catId) =>
                      categoriesData.find((cat) => cat._id === catId)
                        ?.subcategories || []
                  )
                  .map((sub) => (
                    <MenuItem key={sub._id} value={sub._id}>
                      <Checkbox
                        checked={(field.value || []).indexOf(sub._id) > -1}
                      />
                      <ListItemText primary={sub.subCategoryName} />
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          )}
        />
        <Controller
          name="nestedCategoryIds"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth>
              <InputLabel>Nested Subcategories</InputLabel>
              <Select
                {...field}
                multiple
                input={<OutlinedInput label="Nested Subcategories" />}
                renderValue={(selected) =>
                  selected
                    .map(
                      (id) =>
                        selectedSubcategories
                          .flatMap(
                            (subId) =>
                              selectedCategories
                                .flatMap(
                                  (catId) =>
                                    categoriesData.find(
                                      (cat) => cat._id === catId
                                    )?.subcategories || []
                                )
                                .find((sub) => sub._id === subId)
                                ?.nestedSubcategories || []
                          )
                          .find((nested) => nested._id === id)?.subCategoryName
                    )
                    .filter(Boolean)
                    .join(", ")
                }
                value={field.value || []}
              >
                {selectedSubcategories
                  .flatMap(
                    (subId) =>
                      selectedCategories
                        .flatMap(
                          (catId) =>
                            categoriesData.find((cat) => cat._id === catId)
                              ?.subcategories || []
                        )
                        .find((sub) => sub._id === subId)
                        ?.nestedSubcategories || []
                  )
                  .map((nestedSub) => (
                    <MenuItem key={nestedSub._id} value={nestedSub._id}>
                      <Checkbox
                        checked={
                          (field.value || []).indexOf(nestedSub._id) > -1
                        }
                      />
                      <ListItemText primary={nestedSub.subCategoryName} />
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          )}
        />
      </Box>

      <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
        <Controller
          name="password"
          control={control}
          rules={{
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              error={!!errors.password}
              helperText={errors.password?.message}
              InputProps={{
                startAdornment: (
                  <LockOutlinedIcon
                    color="primary"
                    style={{ marginRight: "8px" }}
                  />
                ),
                endAdornment: (
                  <ButtonComponent
                    btnTitle={
                      showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />
                    }
                    onBtnClick={() => setShowPassword(!showPassword)}
                    sx={{ minWidth: "unset" }}
                  />
                ),
              }}
            />
          )}
        />
        <Controller
          name="confirmPassword"
          control={control}
          rules={{
            required: "Confirm Password is required",
            validate: (value, context) => {
              const { password } = context;
              return value === password || "The passwords do not match";
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
              InputProps={{
                startAdornment: (
                  <LockOutlinedIcon
                    color="primary"
                    style={{ marginRight: "8px" }}
                  />
                ),
                endAdornment: (
                  <ButtonComponent
                    btnTitle={
                      showConfirmPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )
                    }
                    onBtnClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    sx={{ minWidth: "unset" }}
                  />
                ),
              }}
            />
          )}
        />
      </Box>

      {/* <ButtonComponent
        btnTitle="Complete Profile"
        type="submit"
        fullWidth
        // disabled={LoginLoading}
        // loading={LoginLoading}
        sx={{ mt: 3 }}
      /> */}
    </>
  );
};

export default ProfileStep;

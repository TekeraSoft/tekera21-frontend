import { createSlice } from "@reduxjs/toolkit";

interface FormControlSliceProps {
  isEditing: boolean;
}

const initialState: FormControlSliceProps = {
  isEditing: false,
};

export const FormControlSlice = createSlice({
  name: "formControl",
  initialState,
  reducers: {
    setIsEditing: (state, action) => {
      state.isEditing = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setIsEditing } = FormControlSlice.actions;

export default FormControlSlice.reducer;

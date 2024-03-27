import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: String,
  arr: [],
};

const EducationSlice = createSlice({
  name: "Education",
  initialState: initialState,
  reducers: {
    register(state, action) {
      state._id = action.payload._id;
    },
    update(state, action) {
        state.arr = action.payload.arr;
    },
    logout(_state, action){
        _state = initialState;
    }
  },
});

export const { register, update, logout } = EducationSlice.actions;

export default EducationSlice.reducer;

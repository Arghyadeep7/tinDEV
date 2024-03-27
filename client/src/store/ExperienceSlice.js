import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: String,
  arr: Array,
};

const ExperienceSlice = createSlice({
  name: "Experience",
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

export const { register, update, logout } = ExperienceSlice.actions;

export default ExperienceSlice.reducer;

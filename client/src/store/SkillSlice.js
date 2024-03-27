import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: String,
  arr: Array,
};

const SkillSlice = createSlice({
  name: "Skill",
  initialState: initialState,
  reducers: {
    register(state, action) {
      state._id = action.payload._id;
    },
    update(state, action) {
      state.arr = action.payload.arr;
    },
    logout(_state, action) {
      _state = initialState;
    },
  },
});

export const { register, update, logout } = SkillSlice.actions;

export default SkillSlice.reducer;

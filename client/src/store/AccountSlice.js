import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    _id: String,
    fname: String,
    lname: String,
    email: String,
    password: String,
    dob: String,
    gender: String,
    nationality: String,
    address: String,
    pinCode: Number,
    college: String,
    university: String,
    roll: String,
    course: String,
    type: String,
    specialisation: String,
    duration: Number,
    grad: Number,
    status: String,
};

const AccountSlice = createSlice({
  name: "Account",
  initialState: initialState,
  reducers: {
    update(state, action){
      state._id = action.payload._id;
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.fname = action.payload.fname;
      state.lname = action.payload.lname;
      state.dob = action.payload.dob;
      state.gender = action.payload.gender;
      state.nationality = action.payload.nationality;
      state.address = action.payload.address;
      state.pinCode = action.payload.pinCode;
      state.college = action.payload.college;
      state.university = action.payload.university;
      state.roll = action.payload.roll;
      state.course = action.payload.course;
      state.type = action.payload.type;
      state.specialisation = action.payload.specialisation;
      state.duration = action.payload.duration;
      state.grad = action.payload.grad;
      state.status = action.payload.status;
    },
    logout(_state, action){
      _state = initialState;
    }
  },
});

export const { update, logout } = AccountSlice.actions;

export default AccountSlice.reducer;

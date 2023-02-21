import { createSlice } from "@reduxjs/toolkit";
import { getUserInfo } from "./UserThunk";

let initialState = {
  loading: false,
  user: [],
  matrix: [],
  MoveCount: 0,
  CurrentColumnVal:0,
  CurrentRowVal:0,
  deltaVal:0,
  error: null,
  MovesLeft: 0,
  closestColor:[],
  deltaValue:0

};

export const usersSlice = createSlice({
  name: "users",
  initialState : initialState,
  reducers: {
    matrix(state, action) {
      state.matrix = action.payload
    },
    MovesCount(state, action) {
      state.MoveCount = action.payload
    },
    CurrentColumn(state, action) {
      state.CurrentColumnVal = action.payload
    },
    CurrentRow(state, action) {
      state.CurrentRowVal = action.payload
    },
    deltaValue(state, action) {
      state.deltaVal = action.payload
    },
    MovesLeft(state, action) {
      state.MovesLeft = action.payload
    },
    setClosestColor(state, action) {
      state.closestColor = action.payload
    },
    setDeltaValue(state, action) {
      state.deltaValue = action.payload
    },
    reset: () => initialState
  },
  extraReducers: (builder) => {
    builder.addCase(getUserInfo.pending, (state) => {
        state.loading = true
    })
    builder.addCase(getUserInfo.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.error = null
    })
    builder.addCase(getUserInfo.rejected, (state, action) => {
        state.loading = false
        state.user = []
        state.error = action.error.message
    })

    // builder.addCase(getCurrentUserInfo.pending, (state) => {
    //     state.loading = true
    // })
    // builder.addCase(getCurrentUserInfo.fulfilled, (state, action) => {
    //     state.loading = false,
    //     state.user = action.payload,
    //     state.error = ""
    // })
    // builder.addCase(getCurrentUserInfo.rejected, (state, action) => {
    //     state.loading = false,
    //     state.user = [],
    //     state.error = action.error.message
    // })
  },
});

export const { matrix , MovesCount , CurrentColumn , CurrentRow , deltaValue , MovesLeft , setClosestColor , setDeltaValue , reset } = usersSlice.actions
export default usersSlice.reducer;

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";

const endPoint = "http://localhost:9876";

export const getUserInfo = createAsyncThunk('getUserInfo', async () => {
  const response = await axios.get(`${endPoint}/init`);
  return response.data
})

export const getCurrentUserInfo = createAsyncThunk('getCurrentUserInfo', async (userId) => {
  const response = await axios.get(`${endPoint}/init/user/${userId}`)
  return response.data
})


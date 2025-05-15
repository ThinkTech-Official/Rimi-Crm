import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  sub: string;
  userType: string;
  fullName: string;
  agentCode: string;
  iat: number;
  exp: number;
}

interface AuthState {
  token: string | null;
  userType: string | null;
  agentCode: string | null;
  fullName: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  userType: null,
  agentCode: null,
  fullName: null,
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/login",
        credentials
      );
      const token = response.data.access_token;

      Cookies.set("token", token);

      const decoded: DecodedToken = jwtDecode(token);

      return {
        token,
        userType: decoded.userType,
        fullName: decoded.fullName,
        agentCode: decoded.agentCode,
      };
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.userType = null;
      state.fullName = null;
      state.agentCode = null;
      Cookies.remove("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.userType = action.payload.userType;
        state.fullName = action.payload.fullName;
        state.agentCode = action.payload.agentCode;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

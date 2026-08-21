// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// import Cookies from "js-cookie";
// import { jwtDecode } from "jwt-decode";
// import { API_BASE } from "../utils/urls";

// interface DecodedToken {
//   sub: string;
//   userType: string;
//   fullName: string;
//   agentCode: string;
//   iat: number;
//   exp: number;
// }

// interface AuthState {
//   token: string | null;
//   userType: string | null;
//   agentCode: string | null;
//   fullName: string | null;
//   loading: boolean;
//   error: string | null;
//   initialized: boolean;
// }

// const initializeAuthState = (): Omit<AuthState, 'loading' | 'error'> => {
//   const token = Cookies.get("token");

//   if (!token) {
//     return {
//       token: null,
//       userType: null,
//       agentCode: null,
//       fullName: null,
//       initialized: true,
//     };
//   }

//   try {
//     const decoded: DecodedToken = jwtDecode(token);

//     const now = Date.now() / 1000;
//     if (decoded.exp < now) {
//       Cookies.remove("token");
//       return {
//         token: null,
//         userType: null,
//         agentCode: null,
//         fullName: null,
//         initialized: true,
//       };
//     }

//     return {
//       token,
//       userType: decoded.userType,
//       fullName: decoded.fullName,
//       agentCode: decoded.agentCode,
//       initialized: true,
//     };
//   } catch (error) {
//     console.error("Failed to decode token:", error);
//     Cookies.remove("token");
//     return {
//       token: null,
//       userType: null,
//       agentCode: null,
//       fullName: null,
//       initialized: true,
//     };
//   }
// };

// const initialState: AuthState = {
//   ...initializeAuthState(),
//   loading: false,
//   error: null,
// };

// export const loginUser = createAsyncThunk(
//   "auth/loginUser",
//   async (
//     credentials: { email: string; password: string },
//     { rejectWithValue }
//   ) => {
//     try {
//       const response = await axios.post(
//         `${API_BASE}/auth/login`,
//         credentials,
//         {
//           withCredentials: true,
//         }
//       );
//       const token = response.data.access_token;

//       const decoded: DecodedToken = jwtDecode(token);

//       return {
//         token,
//         userType: decoded.userType,
//         fullName: decoded.fullName,
//         agentCode: decoded.agentCode,
//       };
//     } catch (err: any) {
//       return rejectWithValue(err.response?.data?.message || "Login failed");
//     }
//   }
// );

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     logout: (state) => {
//       state.token = null;
//       state.userType = null;
//       state.fullName = null;
//       state.agentCode = null;

//       Cookies.remove("token");

//       axios.post(`${API_BASE}/auth/logout`, {}, { withCredentials: true })
//         .catch(err => console.error('Logout error:', err));
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(loginUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.token = action.payload.token;
//         state.userType = action.payload.userType;
//         state.fullName = action.payload.fullName;
//         state.agentCode = action.payload.agentCode;
//         state.initialized = true;
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       });
//   },
// });

// export const { logout } = authSlice.actions;
// export default authSlice.reducer;

// =====================================

// import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
// import axios from "axios";
// import Cookies from "js-cookie";
// import { jwtDecode } from "jwt-decode";
// import { API_BASE } from "../utils/urls";

// interface DecodedToken {
//   sub: string;
//   userType: string;
//   fullName: string;
//   agentCode: string;
//   iat: number;
//   exp: number;
// }

// interface AuthState {
//   token: string | null;
//   userType: string | null;
//   agentCode: string | null;
//   fullName: string | null;
//   loading: boolean;
//   error: string | null;
//   initialized: boolean;
// }

// const initializeAuthState = (): Omit<AuthState, 'loading' | 'error'> => {
//   const token = Cookies.get("accessToken"); // Changed from "token" to "accessToken"

//   if (!token) {
//     return {
//       token: null,
//       userType: null,
//       agentCode: null,
//       fullName: null,
//       initialized: true,
//     };
//   }

//   try {
//     const decoded: DecodedToken = jwtDecode(token);

//     const now = Date.now() / 1000;
//     if (decoded.exp < now) {
//       console.log('Access token expired on init');
//       Cookies.remove("accessToken");
//       Cookies.remove("refreshToken");
//       return {
//         token: null,
//         userType: null,
//         agentCode: null,
//         fullName: null,
//         initialized: true,
//       };
//     }

//     return {
//       token,
//       userType: decoded.userType,
//       fullName: decoded.fullName,
//       agentCode: decoded.agentCode,
//       initialized: true,
//     };
//   } catch (error) {
//     console.error("Failed to decode token:", error);
//     Cookies.remove("accessToken");
//     Cookies.remove("refreshToken");
//     return {
//       token: null,
//       userType: null,
//       agentCode: null,
//       fullName: null,
//       initialized: true,
//     };
//   }
// };

// const initialState: AuthState = {
//   ...initializeAuthState(),
//   loading: false,
//   error: null,
// };

// export const loginUser = createAsyncThunk(
//   "auth/loginUser",
//   async (
//     credentials: { email: string; password: string },
//     { rejectWithValue }
//   ) => {
//     try {
//       const response = await axios.post(
//         `${API_BASE}/auth/login`,
//         credentials,
//         { withCredentials: true }
//       );

//       const token = response.data.accessToken;
//       const decoded: DecodedToken = jwtDecode(token);

//       return {
//         token,
//         userType: decoded.userType,
//         fullName: decoded.fullName,
//         agentCode: decoded.agentCode,
//       };
//     } catch (err: any) {
//       return rejectWithValue(err.response?.data?.message || "Login failed");
//     }
//   }
// );

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     logout: (state) => {
//       state.token = null;
//       state.userType = null;
//       state.fullName = null;
//       state.agentCode = null;

//       // Remove cookies
//       Cookies.remove("accessToken");
//       Cookies.remove("refreshToken");

//       // Trigger multi-tab logout
//       localStorage.setItem('logout-event', Date.now().toString());
//       localStorage.removeItem('logout-event');

//       // Call backend logout to revoke refresh tokens
//       axios.post(`${API_BASE}/auth/logout`, {}, { withCredentials: true })
//         .catch(err => console.error('Backend logout error:', err));
//     },

//     //
//     setAccessToken: (state, action: PayloadAction<string>) => {
//       try {
//         const decoded: DecodedToken = jwtDecode(action.payload);
//         state.token = action.payload;
//         state.userType = decoded.userType;
//         state.fullName = decoded.fullName;
//         state.agentCode = decoded.agentCode;
//       } catch (error) {
//         console.error('Failed to decode refreshed token:', error);
//       }
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(loginUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.token = action.payload.token;
//         state.userType = action.payload.userType;
//         state.fullName = action.payload.fullName;
//         state.agentCode = action.payload.agentCode;
//         state.initialized = true;
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       });
//   },
// });

// export const { logout, setAccessToken } = authSlice.actions;
// export default authSlice.reducer;

// ==============================

// import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
// import axios from "axios";
// import { jwtDecode } from "jwt-decode";
// import { API_BASE } from "../utils/urls";

// interface DecodedToken {
//   sub: string;
//   userType: string;
//   fullName: string;
//   agentCode: string;
//   iat: number;
//   exp: number;
// }

// interface AuthState {
//   token: string | null;
//   userType: string | null;
//   agentCode: string | null;
//   fullName: string | null;
//   loading: boolean;
//   error: string | null;
//   initialized: boolean;
// }

// const initialState: AuthState = {
//   token: null,
//   userType: null,
//   agentCode: null,
//   fullName: null,
//   loading: false,
//   error: null,
//   initialized: false,
// };

// export const initializeAuth = createAsyncThunk(
//   "auth/initialize",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(
//         `${API_BASE}/auth/me`,
//         { withCredentials: true }
//       );

//       return {
//         userType: response.data.userType,
//         fullName: response.data.fullName,
//         agentCode: response.data.agentCode,
//       };
//     } catch (err: any) {

//       return rejectWithValue('No active session');

//     }
//   }
// );

// export const loginUser = createAsyncThunk(
//   "auth/loginUser",
//   async (
//     credentials: { email: string; password: string },
//     { rejectWithValue }
//   ) => {
//     try {
//       const response = await axios.post(
//         `${API_BASE}/auth/login`,
//         credentials,
//         { withCredentials: true }
//       );

//       const token = response.data.accessToken;
//       const decoded: DecodedToken = jwtDecode(token);

//       return {
//         token,
//         userType: decoded.userType,
//         fullName: decoded.fullName,
//         agentCode: decoded.agentCode,
//       };
//     } catch (err: any) {
//       return rejectWithValue(err.response?.data?.message || "Login failed");
//     }
//   }
// );

// export const logoutUser = createAsyncThunk(
//   'auth/logout',
//   async () => {
//     try {
//       await axios.post(`${API_BASE}/auth/logout`, {}, { withCredentials: true });
//     } catch (error) {
//       console.error('Backend logout error:', error);

//     }
//   }
// );

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {

//     logout: (state) => {
//       state.token = null;
//       state.userType = null;
//       state.fullName = null;
//       state.agentCode = null;

//       localStorage.setItem('logout-event', Date.now().toString());
//       localStorage.removeItem('logout-event');

//       axios.post(`${API_BASE}/auth/logout`, {}, { withCredentials: true })
//         .catch(err => console.error('Backend logout error:', err));
//     },

//     setAccessToken: (state, action: PayloadAction<string>) => {
//       try {
//         const decoded: DecodedToken = jwtDecode(action.payload);
//         state.token = action.payload;
//         state.userType = decoded.userType;
//         state.fullName = decoded.fullName;
//         state.agentCode = decoded.agentCode;
//       } catch (error) {
//         console.error('Failed to decode refreshed token:', error);
//       }
//     },
//   },
//   extraReducers: (builder) => {
//     builder

//       .addCase(initializeAuth.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(initializeAuth.fulfilled, (state, action) => {
//         state.loading = false;
//         state.token = 'authenticated';
//         state.userType = action.payload.userType;
//         state.fullName = action.payload.fullName;
//         state.agentCode = action.payload.agentCode;
//         state.initialized = true;
//       })
//       .addCase(initializeAuth.rejected, (state) => {
//         state.loading = false;
//         state.initialized = true;
//       })

//       .addCase(loginUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.token = action.payload.token;
//         state.userType = action.payload.userType;
//         state.fullName = action.payload.fullName;
//         state.agentCode = action.payload.agentCode;
//         state.initialized = true;
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       })

//       .addCase(logoutUser.fulfilled, (state) => {
//         state.token = null;
//         state.userType = null;
//         state.fullName = null;
//         state.agentCode = null;

//         localStorage.setItem('logout-event', Date.now().toString());
//         localStorage.removeItem('logout-event');
//       });
//   },
// });

// export const { logout, setAccessToken } = authSlice.actions;
// export default authSlice.reducer;

// ===================================

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { API_BASE } from "../utils/urls";

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
  initialized: boolean;
}

const initialState: AuthState = {
  token: null,
  userType: null,
  agentCode: null,
  fullName: null,
  loading: false,
  error: null,
  initialized: false,
};

export const initializeAuth = createAsyncThunk(
  "auth/initialize",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE}/auth/me`, {
        withCredentials: true,
      });
      return {
        userType: response.data.userType,
        // fullName: response.data.fullName,
        fullName: `${response.data.firstName} ${response.data.lastName}`, 
        agentCode: response.data.agentCode,
      };
    } catch (err: any) {
      return rejectWithValue("No active session");
    }
  },
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await axios.post(`${API_BASE}/auth/login`, credentials, {
        withCredentials: true,
      });
      // const token = response.data.accessToken;
      // const decoded: DecodedToken = jwtDecode(token);
      // return {
      //   token,
      //   userType: decoded.userType,
      //   fullName: decoded.fullName,
      //   agentCode: decoded.agentCode,
      // };
      return {
        token: "authenticated" as const,
        userType: response.data.userType,
        fullName: response.data.fullName,
        agentCode: response.data.agentCode,
      };
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  },
);

export const logoutUser = createAsyncThunk("auth/logout", async () => {
  try {
    await axios.post(`${API_BASE}/auth/logout`, {}, { withCredentials: true });
  } catch (error) {
    console.error("Backend logout error:", error);
  }

  try {
    localStorage.setItem("logout-event", Date.now().toString());
    localStorage.removeItem("logout-event");
  } catch {}
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.userType = null;
      state.fullName = null;
      state.agentCode = null;
    },

    setAccessToken: (state, action: PayloadAction<string>) => {
      try {
        const decoded: DecodedToken = jwtDecode(action.payload);
        state.token = action.payload;
        state.userType = decoded.userType;
        state.fullName = decoded.fullName;
        state.agentCode = decoded.agentCode;
      } catch (error) {
        console.error("Failed to decode refreshed token:", error);
      }
    },
    markAuthenticated: (state) => {
  state.token = "authenticated";
},
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(initializeAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.token = "authenticated";
        state.userType = action.payload.userType;
        state.fullName = action.payload.fullName;
        state.agentCode = action.payload.agentCode;
        state.initialized = true;
      })
      .addCase(initializeAuth.rejected, (state) => {
        state.loading = false;
        state.initialized = true;
      })
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
        state.initialized = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(logoutUser.fulfilled, (state) => {
        state.token = null;
        state.userType = null;
        state.fullName = null;
        state.agentCode = null;
      });
  },
});

// export const { logout, setAccessToken } = authSlice.actions;
export const { logout, setAccessToken, markAuthenticated } = authSlice.actions;
export default authSlice.reducer;

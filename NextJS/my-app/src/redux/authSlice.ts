import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../api/baseurl";

export const loginUser = createAsyncThunk(
    'auth/login',
    async (data: {email: string, password: string}, thunkAPI) => {
        try {
            const res = await api.post("auth/login", data);
            return res.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
);


export const signupUser = createAsyncThunk(
    'auth/signup',
    async (data: {email: string, password: string}, thunkAPI) => {
        try {
            const res = await api.post("/auth/signup", data);
            return res.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
);

export const getprofile = createAsyncThunk('profile', 
    async (_, thunkAPI) => {
        try {
            const res = await api.get('/profile');
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(null);
        }
    }
)


const getAuthStorage = () => {
    if(typeof window !== 'undefined') {
const data = localStorage.getItem('auth');
    return data ? JSON.parse(data) : null;
    }

    return null;
    
}

const clearAuthStorage = () => {
    if(typeof window != 'undefined'){
        localStorage.removeItem("auth");
    }
    
}

const saveAuthStorage = (auth: any) => {
    if(typeof window !== 'undefined'){
        localStorage.setItem("auth", JSON.stringify(auth));
    }
   
}


const storeAuth = getAuthStorage();
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: storeAuth?.user || null,
        loading: false,
        error: null as string | null,
        isAuthenticated: storeAuth?.isAuthenticated || false
    },

    reducers: {
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;

            clearAuthStorage(); // remove from localstorage and cookie
        }
    },

    extraReducers: (builder) => {
        builder 
        .addCase(loginUser.pending, (state) => {
            state.loading = true;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            // server returns {message, success, token, data: {user info}}
            state.user = action.payload?.data || action.payload;
            state.isAuthenticated = true;
            state.error = null;

            saveAuthStorage({
                user: state.user,
                isAuthenticated: true,
            });
        })
        .addCase(loginUser.rejected, (state, action: any) => {
            state.loading = false;
            state.error = action.payload?.message;
        })
        

        // Signup;
        .addCase(signupUser.pending, (state) => {
            state.loading = true;
        })
        .addCase(signupUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload?.data || action.payload;
            state.isAuthenticated = true;
            state.error = null;

            saveAuthStorage({
                user: state.user,
                isAuthenticated: true,
            });
        })
        .addCase(signupUser.rejected, (state, action: any) => {
            state.loading = false;
            state.error = action.payload?.message;
        })

        // Get profile
        .addCase(getprofile.pending, (state) => {
            state.loading = true;
        })
        .addCase(getprofile.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload?.data || action.payload;
            state.error = null;

            saveAuthStorage({
                user: state.user,
                isAuthenticated: true,
            });
        })
        .addCase(getprofile.rejected, (state, action)=> {
            state.loading = false;
            state.user = null;
        }
    )
    }
})

export const {logout} = authSlice.actions;
export default authSlice.reducer;
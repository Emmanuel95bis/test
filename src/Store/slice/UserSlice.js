import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUser = createAsyncThunk(
    'user',
    async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        return await response.json()
    }
)
// Le state initial de la feature freelances
const initialState = {
    isAccepted: false,
    users: [],
    error: null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetching: (state) => {
      state.status = "pending";
    },
    resolved: (state, action) => {
      state.status = "fulfilled";
      state.data = action.payload; // assuming the payload contains the data
      state.error = null;
    },
    rejected: (state, action) => {
      state.status = "rejected";
      state.error = action.payload; // assuming the payload contains the error
    },
    afficher: (state) => {
      console.log(state);
    },
  },
  extraReducers: (builder) => {
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            return{
                ...state,
                users: action.payload,
                isAccepted: true
            }
        })
        builder.addCase(fetchUser.rejected, (state, action) => {
          console.log('error')
        })
    },
});

export const {resolved, rejected} = userSlice.actions;

export const userReducer = userSlice.reducer;

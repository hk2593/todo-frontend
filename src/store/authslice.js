import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  name: null,
  todos:[],
  addtodo:0,
  date:null
  // Add follow status field
};

export const userSlice = createSlice({
  name: 'auth',
  initialState,
 
  reducers: {
    setLogin: (state, action) => {
      state.name = action.payload.name;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.name = null;
      state.token = null; 
    },
    setaddtodo: (state)=>{
      state.addtodo=1-state.addtodo;
    },
    setTodos: (state,action)=>{
      state.todos=action.payload;
    },
    setDate:(state,action)=>{
      state.date=action.payload;
    }
  },
});

export const { setLogin, setLogout, setTodos,setaddtodo,setDate} = userSlice.actions;
export default userSlice.reducer;
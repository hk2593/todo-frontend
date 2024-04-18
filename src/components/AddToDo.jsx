import React, { useState } from 'react'
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { setTodos, setaddtodo,setDate } from '../store/authslice';
import axios from 'axios';
import API_KEY from "../api_key"
const AddToDo = () => {
  const addtodo=useSelector(state=>state.auth.addtodo);
  
  
  const [description,setdescription]=useState('');
  const date=useSelector(state=>state.auth.date)
  const token=useSelector(state=>state.auth.token);
  const [d, setD] = useState(date);
  const [title,setTitle]=useState('');
  const handleDate = (event) => {
    const selectedDate = event.target.value;
    setD(selectedDate);
  };
  const dispatch=useDispatch();
  const handleAddtodo=()=>{
    dispatch(setDate(d))
    dispatch(setaddtodo());
 }
  
 const todaydate=new Date();
 const year = todaydate.getFullYear();
 const month = String(todaydate.getMonth() + 1).padStart(2, '0');
 const day = String(todaydate.getDate()).padStart(2, '0');
 
 const formattedDate = `${year}-${month}-${day}`;
 let d1=year+month+day;

 const s=date.split('-');
  const d2=s[0]+s[1]+s[2];

 const handlenewTodo=async()=>{
  const response = await axios.post(`${API_KEY}todo/createTodos`,{date,title,description}, {
      
    headers: {
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${token}`
    },})
    
    if(response.status==200){
      const t=await axios.get(`${API_KEY}todo/getTodos`, {
      
        headers: {
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${token}`
        },})
      console.log(t)
      setTitle('');
      setdescription('');
      setDate('');
      dispatch(setTodos(t.data));
    }
}
  return (
    <div>
      <div className="flex flex-col gap-4">
        <label htmlFor="date" className="text-lg text-white font-semibold">Select a date:</label>
        <input 
        type="date" 
        id="date" 
        name="date" 
        value={d}
        className="border rounded-md p-2" 
        onChange={handleDate}
        />
        <label htmlFor="title" className="text-lg text-white font-semibold">Title:</label>
         <input 
          type="text" 
          id="title" 
          name="title" 
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
          placeholder="Enter title" 
          className="border rounded-md p-2"
        />
        <label htmlFor="description" className="text-lg text-white font-semibold">Description:</label>
        <input 
        type="text" 
        id="description" 
        name="description"
        value={description}
        onChange={(e)=>setdescription(e.target.value)} 
        placeholder="Enter description" 
        className="border rounded-md p-2"
       />
       <div className='w-full flex justify-center gap-4'>
       <Button onClick={handlenewTodo} variant="outlined" disabled={d1 > d2}>Add Todo</Button>
       <Button
      onClick={handleAddtodo}
      variant="contained"
      color="primary"
      
      sx={{
        '&:hover': {
          backgroundColor: '#4caf50',
        },
      }}
    >
      Go Back
      </Button>
       </div>
      </div>
      
    </div>
  )
}

export default AddToDo

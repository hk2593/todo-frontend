import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDate, setLogin, setTodos } from '../store/authslice';
import API_KEY from '../api_key'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const LoginForm = () => {
  const [l, setl] = useState('login');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [name,setName]=useState('');
  const dispatch=useDispatch();
  

  const handlelogin=async()=>{
    const response = await axios.post(`${API_KEY}auth/login`,{email,password}, {
        
        headers: {
          'Content-Type': 'application/json', 
        },})
        if(response.status==400){
          toast.error(response.data.msg);
        }
    dispatch(setLogin({name:response.data.is_email_present.name,token:response.data.token}));
    const t=await axios.get(`${API_KEY}todo/getTodos`, {
      
      headers: {
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${response.data.token}`
      },})
      dispatch(setTodos(t.data));
      const todaydate=new Date();
      const year = todaydate.getFullYear();
      const month = String(todaydate.getMonth() + 1).padStart(2, '0');
      const day = String(todaydate.getDate()).padStart(2, '0');
    
      const formattedDate = `${year}-${month}-${day}`;
      dispatch(setDate(formattedDate));
  }
  const handlesignup=async()=>{
    const response = await axios.post(`${API_KEY}auth/signup`,{email,password,name}, {
        
      headers: {
        'Content-Type': 'application/json', 
      },})
      if(response.status==200){
        setl('login')
      }
      if(response.status==400){
        toast.error(response.data.msg);
      }
  }

  return (
    <div className=''>
      {l === 'login' && (
        <div className="min-h-screen flex flex-col overflow-x-hidden overflow-y-auto justify-start items-center bg-slate-900 max-w-screen">
          <h1 className='text-white p-4 text-4xl font-bold mb-8'>Login</h1>
          <div className=" lg:w-1/3 sm:w-4/6 rounded-lg h-60 gap-2 justify-center p-2 bg-slate-800 flex flex-col items-center">
            <input 
              type="email" 
              placeholder="Email" 
              value={email}
              required 
              onChange={(e)=>setEmail(e.target.value)}
              className="w-full p-2 mb-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
            />
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              required 
              onChange={(e)=>setPassword(e.target.value)}
              className="w-full  p-2 mb-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
            />
            <button onClick={handlelogin}
              className="w-full  py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
            >
              Login
            </button>
            <p className=' text-slate-400'>not registered yet? <span className=' underline cursor-pointer text-white' onClick={() => setl('signup')}>signup</span></p>
          </div>
        </div>
      )}
      {l === 'signup' && (
        <div className="min-h-screen flex flex-col overflow-x-hidden overflow-y-auto justify-start items-center bg-slate-900 max-w-screen">
          <h1 className='text-white p-4 text-4xl font-bold mb-8'>Signup</h1>
          <div className="lg:w-1/3 sm:w-4/6 h-80 rounded-lg gap-2 justify-center p-2 bg-slate-800 flex flex-col items-center">
            <input 
              type="text" 
              onChange={(e)=>setName(e.target.value)}
              value={name}
              placeholder="Name" 
              required
              className="w-full p-2 mb-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
            />
            <input 
              type="email" 
              placeholder="Email" 
              onChange={(e)=>setEmail(e.target.value)}
              required 
              value={email}
              className="w-full p-2 mb-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
            />
            <input 
              type="password" 
              placeholder="Password" 
              onChange={(e)=>setPassword(e.target.value)}
              required 
              value={password}
              className="w-full p-2 mb-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
            />
            <button onClick={handlesignup}
              className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
            >
              Signup
            </button> 
            <p className=' text-slate-400'>already registered? <span className=' underline cursor-pointer text-white' onClick={() => setl('login')}>login</span></p>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginForm;


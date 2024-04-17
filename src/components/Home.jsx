import React from 'react'
import Navbar from './Navbar'
import Homepage from './Homepage'
import { useSelector } from 'react-redux'
import LoginForm from './LoginForm'

const Home = () => {
  const token=useSelector((state)=>state.auth.token);
  return (
    <div>
      <div className="flex overflow-x-hidden flex-col ">
       <Navbar></Navbar>
       {token &&<div className=" min-h-screen flex flex-col overflow-x-hidden overflow-y-auto justify-start items-center bg-slate-900 max-w-screen">
      <h1 className='text-white p-4 text-4xl font-bold mb-8'>My Todos</h1>
       
      <div className="w-4/6 p-2 bg-slate-800 flex justify-center">
       <Homepage />
       </div>
      </div>}
      {
        !token && <LoginForm></LoginForm>
      }
    </div>
    </div>
  )
}

export default Home

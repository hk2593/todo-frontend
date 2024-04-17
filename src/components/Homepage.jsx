import React from 'react'
import Todos from './Todos'
import Calendar from './calendar'
import { useSelector } from 'react-redux'
import AddToDo from './AddToDo'



const Homepage = () => {
  const addtodo=useSelector(state=>state.auth.addtodo);
  const todos=useSelector(state=>state.auth.todos);
  
  return (
    <div className='flex w-full flex-col justify-center gap-10 p-4'>
    
    {!addtodo && <div className='flex w-full flex-col justify-center gap-10 p-4'>
      <Calendar></Calendar>
      <div className='flex justify-start'>
      <Todos></Todos>
      </div>
    </div>}
      {addtodo==1 && <AddToDo></AddToDo>
      }
    </div>
  )
}

export default Homepage

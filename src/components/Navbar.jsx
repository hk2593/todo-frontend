import React from 'react'
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLogout } from '../store/authslice';


const Navbar = () => {
  const dispatch=useDispatch();
  const handlelogout=()=>{
      dispatch(setLogout());
  }
  const token=useSelector(state=>state.auth.token);
  const name=useSelector(state=>state.auth.name);
  return (
    <div className='  flex items-center p-4 justify-between  bg-zinc-700 h-12 text-white'>
      <Link to="/"><span className='p-4 text-3xl font-bold text-white'>
        
        ToDo
      </span></Link>
      
      {token && <div className='flex flex-row gap-4 items-center'>
       
       <span className=' text-2xl text-white'>{name}</span>
      
      <Button 
      onClick={handlelogout}
      variant="contained" 
      color="primary"
      sx={{
        '&:hover': {
          backgroundColor: '#8DECB4',
          color:'#000000'
        },
      }}
    >
      Logout
    </Button>
    </div>
    }
      
    </div>
  )
}

export default Navbar

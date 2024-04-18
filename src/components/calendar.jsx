import React, { useState } from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { setDate, setaddtodo } from '../store/authslice';

const Calendar = () => {
  const todaydate=new Date();
  const year = todaydate.getFullYear();
  const month = String(todaydate.getMonth() + 1).padStart(2, '0');
  const day = String(todaydate.getDate()).padStart(2, '0');
  
  const formattedDate = `${year}-${month}-${day}`;
  let d1=year+month+day;
  
  console.log(d1);
  const [d, setD] = useState(formattedDate);
  const s=d.split('-');
  const d2=s[0]+s[1]+s[2];
  console.log(d2);
  const dispatch=useDispatch();
  dispatch(setDate(formattedDate))
  const handleDate = (event) => {
    const selectedDate = event.target.value;
    setD(selectedDate);
    dispatch(setDate(selectedDate));
  };
  const handleAddtodo=()=>{
     dispatch(setaddtodo());
  }
  const addtodo=useSelector(state=>state.auth.addtodo);
  return (
    <div className="flex flex-col gap-4">
      <div className='flex items-center justify-between'>
      <label htmlFor="date" className="text-lg text-white font-semibold">Select a date:</label>
      <Button
      className=' md:w-12 sm:12'
      onClick={handleAddtodo}
      variant="contained"
      color="primary"
      startIcon={
      addtodo === 0 && d1 > d2 ? <AddIcon /> : null
      }
      disabled={d1 > d2}
      sx={{
      '&:hover': {
      backgroundColor: '#4caf50',
      },
      }}
      >


      {addtodo==1?'Go back':'Add'}
    </Button>
      </div>
      <input 
        value={d}
        type="date" 
        id="date" 
        name="date" 
        className="border rounded-md p-2 w-full "
 
        onChange={handleDate}
      />
      
    </div>
  );
}

export default Calendar;




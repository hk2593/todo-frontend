import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import AddTaskIcon from '@mui/icons-material/AddTask';
import UpdateIcon from '@mui/icons-material/Update';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setTodos } from '../store/authslice';
import  API_KEY  from '../api_key';
const Todos = () => {
  const Todos = useSelector(state => state.auth.todos);
  const [activeButton, setActiveButton] = useState('Pending');
  const [updateTodoId, setUpdateTodoId] = useState(null); 
  const [showUpdateForm, setShowUpdateForm] = useState(false); 
  
  const token = useSelector(state => state.auth.token);
  const dispatch = useDispatch();
  const [title,settitle]=useState('');
  const [description,setdescription]=useState('');
  const date=useSelector(state=>state.auth.date);
  
  const handleCompleted = async (todoId) => {
    try {
      const s='Completed'
      const response = await axios.patch(`${API_KEY}todo/changeStatus`, {s, todoId }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        const updatedTodosResponse = await axios.get(`${API_KEY}todo/getTodos`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        dispatch(setTodos(updatedTodosResponse.data));
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  const handleUpdate=async(todoId)=>{
   
      const response = await axios.patch(`${API_KEY}todo/updateTodo`, {todoId ,title,description}, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        const updatedTodosResponse = await axios.get(`${API_KEY}todo/getTodos`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        dispatch(setTodos(updatedTodosResponse.data));
      }
      setShowUpdateForm(!showUpdateForm);
  }

  const handleDelete = async (todoId) => {
    
    try {
      const s='Trash'
      const response = await axios.patch(`${API_KEY}todo/changeStatus`, { s, todoId }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        const updatedTodosResponse = await axios.get(`${API_KEY}todo/getTodos`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        dispatch(setTodos(updatedTodosResponse.data));
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleUpdateClick = (todo) => {
    setdescription(todo.description);
    settitle(todo.title);
    setUpdateTodoId(todo._id);
    setShowUpdateForm(!showUpdateForm);
  };

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };
  
  const Newtodos = Todos.filter(todo => todo.status === activeButton && todo.date==date  );

  return (
    <div className='flex flex-col gap-4'>
      <div>
        <button
          onClick={() => handleButtonClick('Pending')}
          className={`px-4 py-2 mr-2 rounded-lg focus:outline-none ${activeButton === 'Pending' ? 'bg-green-500 text-white' : 'bg-transparent text-gray-700 hover:bg-gray-200'}`}
        >
          To Do
        </button>
        <button
          onClick={() => handleButtonClick('Completed')}
          className={`px-4 py-2 rounded-lg focus:outline-none ${activeButton === 'Completed' ? 'bg-green-500 text-white' : 'bg-transparent text-gray-700 hover:bg-gray-200'}`}
        >
          Completed
        </button>
      </div>
      <div className='flex flex-col gap-4 justify-start'>
        {Newtodos.map((todo) => (
          <div key={todo._id} className='flex flex-row flex-wrap items-center justify-between gap-5'>
            <div className='flex flex-col gap-2 max-w-96'>
              <h1 className='text-green-500 font-bold text-3xl'>{todo.title}</h1>
              <h3 className='text-white flex flex-wrap'>{todo.description}</h3>
              
            </div>
            <div className='flex gap-4'>
              <DeleteIcon onClick={() => handleDelete(todo._id)} style={{ fontSize: '2rem', cursor: 'pointer' }} />
              <div className='flex flex-wrap gap-4'>
                {activeButton !== 'Completed' && (
                  <AddTaskIcon onClick={() => handleCompleted(todo._id)} style={{ fontSize: '2rem', color: '41B06E', cursor: 'pointer' }} />
                )}
                {activeButton !== 'Completed' && (
                  <UpdateIcon onClick={() => handleUpdateClick(todo)} style={{ fontSize: '2rem', color: '41B06E', cursor: 'pointer' }} />
                )}
              </div>
            </div>
            {showUpdateForm && updateTodoId === todo._id && (
                <div className='w-full'>
                <div className='flex flex-col md:flex-col gap-4 md:gap-8 justify-center items-center  p-4 bg-gray-100 rounded-lg'>
                <input 
                  value={title}
                  onChange={(e)=>settitle(e.target.value)}
                  type="text" 
                  name="updatedTitle" 
                  placeholder="Updated Title" 
                  className=" p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                />
                <textarea 
                 value={description}
                 onChange={(e)=>setdescription(e.target.value)}
                  name="updatedDescription" 
                  placeholder="Updated Description" 
                  className=" p-2 w-full border rounded-md focus:outline-none focus:border-blue-500 mt-4 md:mt-0"
                ></textarea>
                <button onClick={()=>handleUpdate(todo._id)}
                  type="submit" 
                  className="w-auto md:w-auto px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none mt-4 md:mt-0"
                >
                  Update Todo
                </button>
              </div>
              </div>
              
              )}
          </div>
                  
        ))}

      </div>
    </div>
  );
};

export default Todos;


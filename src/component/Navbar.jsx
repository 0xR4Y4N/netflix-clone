import React from 'react'
import {Link,useNavigate} from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
const Navbar = () => {
  const {user,logOut} = UserAuth();
  const navigate = useNavigate();
  const handleLogOut = async ()=>{
    try{
      await logOut();
      navigate('/');
    }catch(error){
      console.log(error);
    }
  }
  return (
    <div className='w-full flex items-center justify-between p-4 z-[100] absolute'>
        <Link to={'/'} className='text-red-600 text-4xl font-bold cursor-pointer'>Netflix</Link>
        <div>
      {
        user?.email?
        <div>
        <Link to={'/account'}><button className='text-white pr-4'>Account</button></Link>
        <button onClick={handleLogOut} className='bg-red-600 px-6 rounded py-2 cursor-pointer text-white'>Logout</button>
        </div>
      :
      <div>
      <Link to={'/signin'}><button className='text-white pr-4'>Sign In</button></Link>
      <Link to={'/signup'}><button className='bg-red-600 px-6 rounded py-2 cursor-pointer text-white'>Sign Up</button></Link></div>}
      </div>
    </div>
  )
}

export default Navbar
import React, { useEffect, useState } from 'react'
import { register, reset } from '../redux/slice/authSlice'
import {useDispatch,useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
function Register() {
    const [userData,setUser]=useState()
    const {user,loading,error,message}=useSelector(state=>state.auth)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const signup=(e)=>{
        e.preventDefault()
        
     
        dispatch(register(userData))
       
       
       
     
       
      
    
    }

    useEffect(()=>{

        if(user)
        navigate('/me')

        if(error){
            toast.error(error.msg)
            dispatch(reset())
        }
     
       
    },[user,error])
   
    

  return (
   
     <form>
        <label>name</label>
        <input type="text" placeholder='enter your name' onChange={(e)=>{
            setUser({...userData, name:e.target.value})
        }} />
        <label>email</label>
        <input type="email" placeholder='enter your email' onChange={(e)=>{
            setUser({...userData, email:e.target.value})
        }}/>
        <label>password</label>
        <input type="password" placeholder='enter your password' onChange={(e)=>{
            setUser({...userData, password:e.target.value})
        }} />
        <button type='submit' onClick={signup}>register</button>


     </form>
  
  )
}

export default Register

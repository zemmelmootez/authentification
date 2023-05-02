import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login } from '../redux/slice/authSlice'

function Login() {

  const [userData,setUser]=useState()
  const dispatch=useDispatch()
  const {user,loading,error,message}=useSelector(state=>state.auth)
  const signin=(e)=>{
    e.preventDefault()
    dispatch(login(userData))
  }
  const navigate=useNavigate()
  useEffect(()=>{
    if(user){
        navigate('/me')
    }
  },[user])
  return (
    <form>
   
   <label>email</label>
        <input type="email" placeholder='enter your email' onChange={(e)=>{
            setUser({...userData, email:e.target.value})
        }}/>
        <label>password</label>
        <input type="password" placeholder='enter your password' onChange={(e)=>{
            setUser({...userData, password:e.target.value})
        }} />
        <button onClick={signin}>login</button>

 </form>
  )
}

export default Login

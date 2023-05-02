import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


function Dashboard() {
    const {user}=useSelector(state=>state.auth)
    const navigate=useNavigate()
    useEffect(()=>{

        if(!user){
            navigate('/login')
        }
    }
    ,[user])
  return (
    <div>
      this is dashboard
    </div>
  )
}

export default Dashboard

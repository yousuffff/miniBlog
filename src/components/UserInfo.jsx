import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function UserInfo() {
  const userData = useSelector((state)=> state.auth.userData)
  const navigate = useNavigate()
  const [userName , setUserName] = useState(null) 
  useEffect(()=>{
    setUserName(userData?.name)
  },[userData])
    return (
      <div>
        <h1>Hi {userName}</h1>
      </div>
    )
  }


export default UserInfo;
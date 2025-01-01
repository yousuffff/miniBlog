import React,{useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Box , CircularProgress} from '@mui/material'
export default function Protected({children , authentication=true}) {
  const navigate = useNavigate()
  const [loader , setLoader]= useState(true)
  const authStatus = useSelector(state => state.auth.status)

  useEffect(() => {
    // If the user is authenticated but authStatus doesn't match, redirect to login
    if(authentication && authStatus !== authentication){
      navigate('/login')
    }
    // If the user is not authenticated and authStatus doesn't match, redirect to home 
    else if(!authentication && authStatus !== authentication){
      navigate('/')
    }
    setLoader(false)
  }, [authentication , authStatus , navigate])
  
  return loader ? (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress size='10rem' />
    </Box>
  ) : <>{children}</>
}


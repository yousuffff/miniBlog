import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'

function LogoutBtn() {
  const dispatch = useDispatch()
  const logoutHandler = ()=>{
    authService.logOut().then(()=>{
      dispatch(logout())
    })
    .catch(err=> console.log(err))
  }
  return (
    <button className='inline-block px-6 py-2 duration-200 hover:bg-nav rounded-full text-white text-lg' onClick={logoutHandler}>Logout</button>
  )
}

export default LogoutBtn
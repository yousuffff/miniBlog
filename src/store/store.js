import {configureStore} from '@reduxjs/toolkit'
import authSliceReducer from './authSlice'
import reducer from './authSlice';

const store = configureStore({
  reducer:{
    auth: authSliceReducer  }
});

export default store;
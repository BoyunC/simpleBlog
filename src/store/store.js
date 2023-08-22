import { configureStore } from '@reduxjs/toolkit'
import toastReducer from './toastSlice'


// 리덕스를 사용하기 위한 초기 세팅 정도 
export const store =  configureStore({
    reducer: {
        toast : toastReducer,
    }
})
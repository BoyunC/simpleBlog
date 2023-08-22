import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    toasts : [],
}

const toastSlice = createSlice({
    name : 'toast',

    // 초기화 
    initialState,

    // 관리하가 위한 함수
    reducers: {
        addToast: (state, action) => {
            // action.payload => 파라미터 값
            state.toasts.push(action.payload)
        },
        removeToast : (state, action) => {
            state.toasts = state.toasts.filter(toast => {
                return toast.id !== action.payload;
            })
        }

    }
})

//console.log(toastSlice.actions.addToast('hello'));


export const { addToast, removeToast } = toastSlice.actions;
export default toastSlice.reducer;
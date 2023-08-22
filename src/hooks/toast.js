import { useState, useRef } from "react";
import { v4 as uuidv4} from 'uuid';

import { addToast as add, removeToast as remove } from "../store/toastSlice";
import { useDispatch } from "react-redux";


const useToast = () => {

    const toasts = useRef([]);
    const [toastRerender, setToastRerender] = useState(false);
    
    const dispatch = useDispatch();


    const deleteToast = (id) => {

        dispatch(remove(id));
        // const filteredToasts = toasts.current.filter(toast => {
        //     return toast.id !== id;
        // });

        // toasts.current = filteredToasts;
        // setToastRerender(prev => !prev);
    }
    
    const addToast = (toast) => {
        const id = uuidv4();
        
        const toastWithId = {
            ...toast,
            id,    
        }
        
        // toasts.current = [...toasts.current, toastWithId];
        // setToastRerender(prev => !prev);

        // 파라미터 값이 매우 중요 => 
        dispatch(add(toastWithId));

        setTimeout(()=>{
            deleteToast(id);
        }, 3000);   
    }


    return {
        // toasts.current,
        addToast,
        deleteToast,
    };
}

export default useToast;


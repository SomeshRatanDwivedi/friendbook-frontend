
import {useProvideAuth} from '../hooks/authHook'
import { createContext } from "react";

const initialState={
    user:null,
    login:()=>{},
    logout:()=>{},
    editProfile:()=>{}
}

export const AuthContext=createContext(initialState);


export const AuthProvider=({children})=>{
    const auth=useProvideAuth();
    return <AuthContext.Provider value={auth}>
        {children}
    </AuthContext.Provider>
}
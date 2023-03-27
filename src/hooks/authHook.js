import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../providers/AuthProvide";
import { getItemFromLocalStorage, removeItemFromLocalStorage, setItemInLocalStorage} from "../utils/constants";
import { login as userLogin } from "../api";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
import {editProfile as profileEdit} from '../api'
import { config } from "../utils/config";


export const useAuth=()=>{
    return useContext(AuthContext);
}

export const useProvideAuth=()=>{
    const [user, setUser]=useState(null);
    useEffect(() => {
        const userToken = getItemFromLocalStorage(config.local_storage_token_key);
        if (userToken) {
            const user = jwt_decode(userToken);
            setUser(user)
        }
    }, [])

    const login=async(email, password)=>{
        const response=await userLogin(email, password);
        if(response.success){
            setUser(response.data.user)
            setItemInLocalStorage(config.local_storage_token_key, response.data.token ? response.data.token : null);
            return {
                success: true
            }
        }
        else {
            return {
                success: false,
                message: response.message
            }
        }
    };

    const logout = () => {
        setUser(null);
        removeItemFromLocalStorage(config.local_storage_token_key);
        toast.success("You are successfully logged out");
    }

    const editProfile = async(body)=>{
        const response = await profileEdit(body);
        if (response.success) {
            setUser(response.data.user);
            setItemInLocalStorage(config.local_storage_token_key, response.data.token ? response.data.token : null);
            return {
                success: true,
                data:response.data
            }
        }
        else {
            return {
                success: false,
                message: response.message
            }
        }
    }

    return {
        user, 
        login,
        logout,
        editProfile
    }
}
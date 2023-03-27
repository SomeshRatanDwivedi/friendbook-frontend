import axios from 'axios'
import { API_URLS } from '../utils/constants';
import { config } from '../utils/config';

const localStorageKey = config.local_storage_token_key

const makeConfig=(isMultiPart)=>{
    const token = window.localStorage.getItem(localStorageKey);
    
    const headers={
        'Content-Type': isMultiPart ?'multipart/form-data': 'application/x-www-form-urlencoded',
    }
    if(token){
        headers.Authorization=`Bearer ${token}`
    }

    const config={
        headers:{
            ...headers
        },
    }
   return config;
   
}

export const login = async(email, password) => {
     const config=makeConfig();
     try{
        const response=await axios.post(API_URLS.login(),{email, password}, config);
        const data=response.data;
        if(data.success){
            return{
                data:data.data,
                success:true
            }
        }
         throw new Error(data.message)

     }catch(error){
         return {
             message: error.message,
             success: false
         }
     }

}

export const signup =async (name, email, password, confirmPassword) => {
    const config = makeConfig();
    try {
        const response = await axios.post(
            API_URLS.signup(), { 
                name, 
                email, 
                password, 
                confirm_password: 
                confirmPassword 
            }, config);
        const data = response.data;
        if (data.success) {
            return {
                data: data.data,
                success: true
            }
        }
        throw new Error(data.message)

    } catch (error) {
        return {
            message: error.message,
            success: false
        }
    }
}


export const createPost = async (formData) => {
    const config = makeConfig(true);
    try {
        const response = await axios.post(
            API_URLS.createPost(),
            formData,
            config);
        const data = response.data;
        if (data.success) {
            return {
                data: data.data,
                success: true
            }
        }
        throw new Error(data.message)

    } catch (error) {
        return {
            message: error.message,
            success: false
        }
    }

}

export const getPosts =async (page = 1, limit = 100) => {
    const config = makeConfig();
    try {
        const response = await axios.get(
            API_URLS.posts(page, limit), 
            config);
        const data = response.data;
        if (data.success) {
            return {
                data: data.data,
                success: true
            }
        }
        throw new Error(data.message)

    } catch (error) {
        return {
            message: error.message,
            success: false
        }
    }
}

export const deletePost = async (id) => {
    const config = makeConfig();
    try {
        const response = await axios.delete(
            API_URLS.deletePost(id),
            config);
        const data = response.data;
        if (data.success) {
            return {
                data: data.data,
                success: true
            }
        }
        throw new Error(data.message)

    } catch (error) {
        return {
            message: error.message,
            success: false
        }
    }

}

export const editProfile = async(body) => {

    const config = makeConfig(true);
    try {
        const response = await axios.post(
            API_URLS.editUser(),
            body,
            config);
        const data = response.data;
        if (data.success) {
            return {
                data: data.data,
                success: true
            }
        }
        throw new Error(data.message)

    } catch (error) {
        return {
            message: error.message,
            success: false
        }
    }
}

export const getUserInfo = async(id) => {
    const config = makeConfig();
    try {
        const response = await axios.get(
            API_URLS.userInfo(id),
            config);
        const data = response.data;
        if (data.success) {
            return {
                data: data.data,
                success: true
            }
        }
        throw new Error(data.message)

    } catch (error) {
        return {
            message: error.message,
            success: false
        }
    }
}

export const getUserFriends = async() => {
    const config = makeConfig();
    try {
        const response = await axios.get(
            API_URLS.friends(),
            config);
        const data = response.data;
        if (data.success) {
            return {
                data: data.data,
                success: true
            }
        }
        throw new Error(data.message)

    } catch (error) {
        return {
            message: error.message,
            success: false
        }
    }
}

export const getAllUsers= async () => {
    const config = makeConfig();
    try {
        const response = await axios.get(
            API_URLS.allUsers(),
            config);
        const data = response.data;
        if (data.success) {
            return {
                data: data.data,
                success: true
            }
        }
        throw new Error(data.message)

    } catch (error) {
        return {
            message: error.message,
            success: false
        }
    }
}

export const addFriend = async (userId) => {

    const config = makeConfig();
    try {
        const response = await axios.post(
            API_URLS.createFriendship(userId),{},
            config);
        const data = response.data;
        if (data.success) {
            return {
                data: data.data,
                success: true
            }
        }
        throw new Error(data.message)

    } catch (error) {
        return {
            message: error.message,
            success: false
        }
    }
}

export const removeFriendShip = async(userId) => {
    const config = makeConfig();
    try {
        const response = await axios.post(
            API_URLS.removeFriend(userId),{},
            config);
        const data = response.data;
        if (data.success) {
            return {
                data: data.data,
                success: true
            }
        }
        throw new Error(data.message)

    } catch (error) {
        return {
            message: error.message,
            success: false
        }
    }

}

export const toggleLike =async (itemId, itemType) => {
    const config = makeConfig();
    try {
        const response = await axios.post(
            API_URLS.toggleLike(itemId, itemType), {},
            config);
        const data = response.data;
        if (data.success) {
            return {
                data: data.data,
                success: true
            }
        }
        throw new Error(data.message)

    } catch (error) {
        return {
            message: error.message,
            success: false
        }
    }
}

// export const getAllCommentOfPost = (post_id) => {
//     return customFetch(API_URLS.getComments(post_id), {
//         method: 'GET'
//     })
// }

export const createComment = async(post_id, content) => {
    const config = makeConfig();
    try {
        const response = await axios.post(
            API_URLS.comment(), {post_id, content},
            config);
        const data = response.data;
        if (data.success) {
            return {
                data: data.data,
                success: true
            }
        }
        throw new Error(data.message)

    } catch (error) {
        return {
            message: error.message,
            success: false
        }
    }
}

export const deleteComment = async(commentId, postId) => {
    const config = makeConfig();
    try {
        const response = await axios.delete(
            API_URLS.deleteComments(commentId, postId), {},
            config);
        const data = response.data;
        if (data.success) {
            return {
                data: data.data,
                success: true
            }
        }
        throw new Error(data.message)

    } catch (error) {
        return {
            message: error.message,
            success: false
        }
    }
}

export const getAllUser = async(searchKey) => {
    const config = makeConfig();
    try {
        const response = await axios.get(
            API_URLS.searchUser(searchKey),
            config);
        const data = response.data;
        if (data.success) {
            return {
                data: data.data,
                success: true
            }
        }
        throw new Error(data.message)

    } catch (error) {
        return {
            message: error.message,
            success: false
        }
    }
}

export const getAllConversations = async () => {
    const config = makeConfig();
    try {
        const response = await axios.get(
            API_URLS.allConversations(),
            config);
        const data = response.data;
        if (data.success) {
            return {
                data: data.data,
                success: true
            }
        }
        throw new Error(data.message)

    } catch (error) {
        return {
            message: error.message,
            success: false
        }
    }
}

export const getAllMessages=async(id)=>{
    const config = makeConfig();
    try {
        const response = await axios.get(
            API_URLS.allMessages(id),
            config);
        const data = response.data;
        if (data.success) {
            return {
                data: data.data,
                success: true
            }
        }
        throw new Error(data.message)

    } catch (error) {
        return {
            message: error.message,
            success: false
        }
    }
}

export const sendMessage = async (recieverId, conversationId, content) => {
    const config = makeConfig();

    try {
        const response = await axios.post(
            API_URLS.sendMessage(recieverId, conversationId),
            {content},
            config);
        const data = response.data;
        if (data.success) {
            return {
                data: data.data,
                success: true
            }
        }
        throw new Error(data.message)

    } catch (error) {
        return {
            message: error.message,
            success: false
        }
    }
}

export const makeNewConversation = async (id) => {
    const config = makeConfig();

    try {
        const response = await axios.post(
            API_URLS.makeNewConversation(id),
            { },
            config);
        const data = response.data;
        if (data.success) {
            return {
                data: data.data,
                success: true
            }
        }
        throw new Error(data.message)

    } catch (error) {
        return {
            message: error.message,
            success: false
        }
    }
}

export const getAllParticipants = async (id) => {
    const config = makeConfig();

    try {
        const response = await axios.get(
            API_URLS.getAllParticipants(id),
            config);
        const data = response.data;
        if (data.success) {
            return {
                data: data.data,
                success: true
            }
        }
        throw new Error(data.message)

    } catch (error) {
        return {
            message: error.message,
            success: false
        }
    }
}

export const getNotifications = async () => {
    const config = makeConfig();

    try {
        const response = await axios.get(
            API_URLS.getNotifications(),
            config);
        const data = response.data;
        if (data.success) {
            return {
                data: data.data,
                success: true
            }
        }
        throw new Error(data.message)

    } catch (error) {
        return {
            message: error.message,
            success: false
        }
    }
}

export const createNotification = async (userId, type, isUserLike=false) => {
    const config = makeConfig();

    try {
        const response = await axios.post(
            API_URLS.createNotification(userId, type, isUserLike),
            {},
            config);
        const data = response.data;
        if (data.success) {
            return {
                data: data.data,
                success: true
            }
        }
        throw new Error(data.message)

    } catch (error) {
        return {
            message: error.message,
            success: false
        }
    }
}

export const getNumberOfNotifications = async () => {
    const config = makeConfig();

    try {
        const response = await axios.get(
            API_URLS.getNumberOfNotifications(),
            config);
        const data = response.data;
        if (data.success) {
            return {
                data: data.data,
                success: true
            }
        }
        throw new Error(data.message)

    } catch (error) {
        return {
            message: error.message,
            success: false
        }
    }
}

export const newNotification = async (userId, isIncrease, isShown = false) => {
   
    const config = makeConfig();
    try {
        const response = await axios.post(
            API_URLS.createNewNotification(userId, isIncrease, isShown), 
            {},
            config);
        const data = response.data;
        if (data.success) {
            return {
                data: data.data,
                success: true
            }
        }
        throw new Error(data.message)

    } catch (error) {
        return {
            message: error.message,
            success: false
        }
    }
}

export const newMessage = async (userId, messages) => {

    const config = makeConfig();
    try {
        const response = await axios.post(
            API_URLS.createNewNotification(userId),
            { messages },
            config);
        const data = response.data;
        if (data.success) {
            return {
                data: data.data,
                success: true
            }
        }
        throw new Error(data.message)

    } catch (error) {
        return {
            message: error.message,
            success: false
        }
    }
}
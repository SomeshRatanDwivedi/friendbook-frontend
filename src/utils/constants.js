import { config } from "./config";
const API_ROOT = config.api_url;



export const API_URLS = {
    login: () => `${API_ROOT}/users/login`,
    signup: () => `${API_ROOT}/users/signup`,
    posts: (page, limit) => `${API_ROOT}/posts?page=${page}&limit=${limit}`,
    createPost: () => `${API_ROOT}/posts/create`,
    deletePost: (id) => `${API_ROOT}/posts/delete_post?post_id=${id}`,
    createFriendship: (userId) => `${API_ROOT}/friendship/create_friendship?user_id=${userId}`,
    friends: () => `${API_ROOT}/friendship/fetch_user_friends`,
    removeFriend: (userId) => `${API_ROOT}/friendship/remove_friendship?user_id=${userId}`,
    toggleLike: (itemId, itemType) => `${API_ROOT}/likes/toggle?likeable_id=${itemId}&likeable_type=${itemType}`,
    getLikes: (itemId, itemType) => `${API_ROOT}/likes?likeable_id=${itemId}&likeableType=${itemType}`,
    comment: () => `${API_ROOT}/comments`,
    deleteComments: (commentId, postId) => `${API_ROOT}/comments?comment_id=${commentId}&post_id=${postId}`,
    getComments: (post_id) => `${API_ROOT}/comments?post_id=${post_id}`,
    editUser: () => `${API_ROOT}/users/edit`,
    userInfo: (userId) => `${API_ROOT}/users/${userId}`,
    searchUser: (searchText) => `${API_ROOT}/users/search?text=${searchText}`,
    allUsers: () => `${API_ROOT}/users/get_all_users`,
    allConversations:()=>`${API_ROOT}/conversation/all_conversations`,
    allMessages:(id)=>`${API_ROOT}/conversation/all_messages?conversationId=${id}`,
    sendMessage: (recieverId, conversationId) => `${API_ROOT}/message/create_new_message?recieverId=${recieverId}&conversationId=${conversationId}`,
    makeNewConversation: (id) => `${API_ROOT}/conversation/new_conversation?recieverId=${id}`,
    getAllParticipants: (id) => `${API_ROOT}/conversation/participants?conversationId=${id}`,
    createNotification:(id, type, isUserLike)=>`${API_ROOT}/notifications/create_notification?userId=${id}&notification_type=${type}&isUserLike=${isUserLike}`,
    getNotifications: () => `${API_ROOT}/notifications/get_notifications`,
    getNumberOfNotifications: () => `${API_ROOT}/notifications/no_of_notifications`,
    createNewNotification: (id, isIncrease, isShown) => `${API_ROOT}/users/new_notifications?userId=${id}&isIncrease=${isIncrease}&isShown=${isShown}`,
    createNewMessage: (id) => `${API_ROOT}/users/new_messages?userId=${id}`,
};


export const setItemInLocalStorage = (key, value) => {
    if (!key || !value) {
        return console.error('Can not store in LS');
    }

    const valueToStore = typeof value !== 'string' ? JSON.stringify(value) : value;
    localStorage.setItem(key, valueToStore);
}

export const getItemFromLocalStorage = (key) => {
    if (!key) {
        return console.error('Can not get the value from LS');
    }
    return localStorage.getItem(key);
}


export const removeItemFromLocalStorage = (key) => {
    if (!key) {
        return console.error('Can not remove the item from LS');
    }
    localStorage.removeItem(key);
}



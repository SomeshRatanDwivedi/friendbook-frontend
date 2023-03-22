const developmenApiUrl='http://localhost:8000/api/v1';
const productionApiUrl ='http://ec2-13-232-73-252.ap-south-1.compute.amazonaws.com:8000/api/v1'
const API_ROOT = productionApiUrl;



export const API_URLS = {
    login: () => `${API_ROOT}/users/login`,
    signup: () => `${API_ROOT}/users/signup`,
    posts: (page, limit) => `${API_ROOT}/posts?page=${page}&limit=${limit}`,
    createPost: () => `${API_ROOT}/posts/create`,
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
    createNotification:(id, type)=>`${API_ROOT}/notifications/create_notification?userId=${id}&notification_type=${type}`,
    getNotifications: () => `${API_ROOT}/notifications/get_notifications`,
    getNumberOfNotifications: () => `${API_ROOT}/notifications/no_of_notifications`

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


export const LOCALSTORAGE_TOKEN_KEY = '__friend_book_token__';


export const backend_url ='http://localhost:8000/'


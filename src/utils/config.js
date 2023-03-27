const development={
    name:'development',
    api_url: process.env.REACT_APP_DEVELOPMENT_API_URL,
    local_storage_token_key: process.env.REACT_APP_LOCALSTORAGE_TOKEN_KEY,
    socket_url:process.env.REACT_APP_DEVELOPMENT_SOCKET_URL
}

const production = {
    name: 'production',
    api_url: process.env.REACT_APP_PRODUCTION_API_URL,
    local_storage_token_key: process.env.REACT_APP_LOCALSTORAGE_TOKEN_KEY,
    socket_url: process.env.REACT_APP_PRODUCTION_SOCKET_URL
   
}

export const config= production;
const development={
    name:'development',
    api_url: process.env.REACT_APP_DEVELOPMENT_API_URL,
    local_storage_token_key: process.env.REACT_APP_LOCALSTORAGE_TOKEN_KEY,
    static_url: process.env.REACT_APP_DEVELOPMENT_STATIC_URL,
}

const production = {
    name: 'production',
    api_url: process.env.REACT_APP_PRODUCTION_API_URL,
    local_storage_token_key: process.env.REACT_APP_LOCALSTORAGE_TOKEN_KEY,
    static_url: process.env.REACT_APP_PRODUCTION_STATIC_URL,
}

export const config= production;
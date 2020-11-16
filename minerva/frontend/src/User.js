import jwt_decode from 'jwt-decode'

export const isLoggedIn = () => {
    const access_token = localStorage.getItem('access_token')
    if (access_token) {
        console.log(true)
        return true       
    } else {
        console.log(false)
        return false
    }
}

export const userId = () => {
    const access_token = localStorage.getItem('access_token')
    if (access_token) {
        const user_id = jwt_decode(access_token).user_id
        console.log(user_id);
        return user_id
    } else {
        console.log('there is no access token')
        return false
    }
}
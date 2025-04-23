import axios from 'axios'

const USER_INSTANCE = axios.create({
    baseURL: `http://localhost:8004/api/users`
})


export const userLogin = async ( credentials )=>{
    try{
        const RES = await USER_INSTANCE.post('/login', credentials)
        return RES.data
    }catch(error){throw error }
}

export const registerUser = async( data )=>{
    try{
        const RES = await USER_INSTANCE.post('/', data)
        return RES.data
    }catch( error ){ throw error }
}
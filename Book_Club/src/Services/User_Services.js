import axios from 'axios'

const USER_INSTANCE = axios.create({
    baseURL: `http://localhost:8004/api/users`
})

const STORY_INSTANCE = axios.create({
    baseURL: `http://localhost:8004/api/story`
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
    }catch( error ){ throw error.response.data.errors }
}

export const getAllStories = async()=>{
    try{
        const RES = await STORY_INSTANCE.get('/')
        return RES.data
    }catch(error){throw error}
}

export const createUserStory= async(id, data)=>{
    try{
        const RES = await STORY_INSTANCE.post(`/${id}`, data)
        return RES.data
    }catch(error){throw error.response.data.errors}
}

export const getUserStories = async(id)=>{
    try{
        const RES = await STORY_INSTANCE.get(`/${id}`)
        return RES.data
    }catch( error ){ throw error }
}

export const getStory = async(StoryId)=>{
    try{
        const RES = await STORY_INSTANCE.get(`/story/${StoryId}`)
        return RES.data
    }catch(error){throw error}
}

export const deleteStoryById = async( id )=>{
    try{
        const RES = await STORY_INSTANCE.delete(`/${id}`)
        return RES.data
    }catch(error){throw error}
}

export const editStoryById = async( id , data)=>{
    try{
        const RES = await STORY_INSTANCE.put(`/${id}`, data)
        return RES.data
    }catch( error ){ throw error.response.data.errors }
}

export const countLikes = async( id )=>{
    try{
        const RES = await STORY_INSTANCE.get(`/likes/${id}`)
        return RES.data
    }catch(error){throw error}
}

export const createLike = async( id, data )=>{
    try{
        console.log(data)
        const RES = await STORY_INSTANCE.post(`/likes/${id}`, data)
        return RES.data
    }catch( error ){ throw error }
}

export const checkIfLiked = async(storyId, userId) => {
    try {
        const RES = await STORY_INSTANCE.get(`/liked/${storyId}/${userId}`)
        return RES.data
    } catch (error) { throw error }
}


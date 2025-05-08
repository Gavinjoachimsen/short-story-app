import React, { useEffect, useState } from 'react'
import { checkIfLiked, countLikes, createLike, getStory } from '../Services/User_Services'
import { useParams } from 'react-router-dom'
import { useAuth } from '../Auth/loggenIn'
export const ReadStory =( )=>{
    const { logout, isLoggedIn, user, name} = useAuth()
    const { StoryId } = useParams()
    const [story, setStory ] = useState({})
    const [likes,  setLikes ] = useState(null)
    const [hasLiked,  setHasLiked ] = useState(false)

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/");
            return null;
          }
        getStory(StoryId)
            .then(res => setStory(res))
            .catch(error => console.log(error))
    
        countLikes(StoryId)
            .then(res => setLikes(res))
            .catch(error => console.log(error))
    
        checkIfLiked(StoryId, user.UserId)
            .then(res => setHasLiked(res.liked))
            .catch(error => console.log(error))
    }, [StoryId, user.UserId])


    const likeStory =( StoryId, UserId )=>{
        createLike(StoryId, {UserId} )
            .then(res => { setHasLiked( res.liked ) 
                return countLikes(StoryId)
            })
            .then(count => setLikes(count))
            .catch(error => console.log(error))
    }

    return(<>
    
    <div className="container mt-5">
            <div className="card shadow">
                <div className="card-header bg-primary text-white">
                    <h2>{story.title}</h2>
                </div>
                <div className="card-body">
                    <h5>By: {story.author}</h5>
                    <p>Genre: {story.genre}</p>
                    <p>Published: {new Date(story.published).toLocaleDateString("en-US", {year: "numeric", month: "long", day: "numeric"})}</p>
                    <hr />
                    <p>{story.story}</p>
                    <div >
                        <button onClick={() => likeStory(StoryId, user.UserId)} >
                            {hasLiked ? "Unlike" : "Like"} Story
                        </button>
                        <span className="badge bg-secondary">{likes} Likes</span>
                    </div>
                </div>
            </div>
        </div>
    </>)
}
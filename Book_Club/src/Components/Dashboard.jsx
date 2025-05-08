import React, { useState, useEffect } from "react"
import { countLikes, deleteStoryById, getAllStories } from "../Services/User_Services"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../Auth/loggenIn"


export const Dashboard = () => {
    const [stories, setStories] = useState([])
    const [likes, setLikes] = useState({})
    const [mostLiked, setMostLiked] = useState(null)
    const { user, isLoggedIn } = useAuth();

    const [searchResult, setSearchResult] = useState("")
    const [searchGenreResult, setSearchGenreResult] = useState("")
    const navigate = useNavigate()


    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/')
        }
        getAllStories()
            .then(async res => {
                setStories(res)
                const likeData = []
                for (const story of res) {
                    try {
                        const likeCount = await countLikes(story.StoryId)
                        likeData[story.StoryId] = likeCount

                    } catch (error) { console.log(error) }
                }
                setLikes(likeData)
                const mostLikedStory = res.length > 0 ? [...res].sort((a, b) => (likeData[b.StoryId] || 0) - (likeData[a.StoryId] || 0))[0] : null;
                    setMostLiked(mostLikedStory)

            }).catch(error => console.log(error))
    }, [])

    const handleSearch = (e) => {
        setSearchResult(e.target.value)
    }
    
    const handleGenreSearch = (e) => {
        setSearchGenreResult(e.target.value)
    }

    const filterStory = stories.filter((story) =>{
       const genreSearch =  searchGenreResult ? story.genre.toLowerCase() === searchGenreResult.toLowerCase() : true
       const search =  story.title.toLowerCase().includes(searchResult.toLowerCase()) || story.author.toLowerCase().includes(searchResult.toLowerCase())
       return genreSearch && search
    }
    )

    const deleteStory = (id) => {
        deleteStoryById(id)
            .then(() => setStories(prev => prev.filter(story => story.StoryId !== id)))
            .catch(error => console.log(error))
    }

    return (<>
        <div className="dashboard-container">
            <div className="filter-container">
                <h2>Filters</h2>
                <form>
                    <select name="genre-filter" value={searchGenreResult} onChange={handleGenreSearch}>
                        <option value="" >None</option>
                        <option value="Horror">Horror</option>
                        <option value="Romance">Romance</option>
                        <option value="fantasy">Fantasy</option>
                        <option value="Fiction">Fiction</option>
                        <option value="Non-Fiction">Non-Fiction</option>
                        <option value="Historical">Historical</option>
                    </select>
                </form>
            </div>
            <div className="container">
                <h1>Stories</h1>
                <input type="search" className="search-bar" placeholder="Seach by Story Title or Authors" onChange={handleSearch} />
                <table className="story-table">
                    <thead>
                        <tr>
                            <th>Story (Story Title)</th>
                            <th>Author</th>
                            <th>Genre</th>
                            <th># Likes</th>
                            <th>Published</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filterStory.map(({ title, author, StoryId, genre, published, userId }) => (
                                <tr key={StoryId}>
                                    <td>
                                        <button className="button-as-text" onClick={()=>navigate(`/readStory/${StoryId}`)}>{title}</button>
                                    </td>
                                    <td>{author}</td>
                                    <td>{genre}</td>
                                    <td>Likes: {likes[StoryId]}</td>
                                    <td>{new Date(published).toLocaleDateString("en-US", {year: "numeric", month: "long", day: "numeric"})}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <div className="mostLiked">
            {mostLiked ? <div>
                <h3>Most Liked Story</h3>
                <p>Title: {mostLiked.title}</p>
                <p>Author: {mostLiked.author}</p>
                <p>Genre: {mostLiked.genre}</p>
            </div>
            :
            null
        }
             </div>
        </div>
    </>)
}
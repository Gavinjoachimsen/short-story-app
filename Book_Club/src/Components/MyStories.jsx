import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { countLikes, deleteStoryById, getUserStories } from "../Services/User_Services"
import { useAuth } from "../Auth/loggenIn"



export const MyStories = () => {
    const { id } = useParams()
    const { logout, isLoggedIn, user, name } = useAuth()
    const [userStories, setUserStories] = useState([])
    const [likes, setLikes] = useState({})
    const navigate = useNavigate()
    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/");
            return null;
        }
        getUserStories(id)
            .then(async (res) => {
                setUserStories(res)
                const likeData = []
                for (const story of res) {
                    try {
                        const likeCount = await countLikes(story.StoryId)
                        likeData[story.StoryId] = likeCount
                    } catch (error) { console.log(error) }
                }
                setLikes(likeData)
            })
            .catch(error => console.log(error))


    }, [id])

    const deleteStory = (id) => {
        deleteStoryById(id)
            .then(() => setUserStories(prev => prev.filter(story => story.StoryId !== id)))
            .catch(error => console.log(error))
    }

    return (<>
        <div className="container2">
            <h1>These are my stories </h1>
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
                        userStories.map(({ title, author, StoryId, genre, published }) => (
                            <tr key={StoryId}>
                                <td>
                                    <button className="button-as-text" onClick={() => navigate(`/readStory/${StoryId}`)}>{title}</button>
                                    <button className="button" onClick={() => { navigate(`/edit/${StoryId}`) }}>Edit Story</button>
                                    <button className="button" onClick={() => deleteStory(StoryId)}>Delete Story</button>
                                </td>
                                <td>{author}</td>
                                <td>{genre}</td>
                                <td>{likes[StoryId]}</td>
                                <td>{new Date(published).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>

    </>)
}
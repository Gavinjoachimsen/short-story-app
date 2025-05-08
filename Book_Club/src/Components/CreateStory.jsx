import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { createUserStory, editStoryById, getStory } from "../Services/User_Services"
import { useAuth } from "../Auth/loggenIn"


const DEFAULT_FORM_DATA = {
    title: "",
    author: "",
    genre: "",
    story: "",
}

export const CreateStory = () => {
    const { id, StoryId } = useParams()
    const { logout, isLoggedIn, user, name } = useAuth()
    const number = parseInt(StoryId, 10)
    const [formData, setFormData] = useState(DEFAULT_FORM_DATA)
    const [errors, setErrors] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/");
            return null;
        }

        if (StoryId) {
            getStory(StoryId)
                .then(res => setFormData(res))
                .catch(error => console.log(error))
        } else {
            setFormData(DEFAULT_FORM_DATA)
        }
    }, [StoryId])

    const updateFormData = (e) => {
        const { value, name } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (StoryId) {
            editStoryById(StoryId, formData)
                .then(() => navigate('/dashboard'))
                .catch(error => setErrors(error))
        } else {
            createUserStory(id, formData)
                .then(() => navigate('/dashboard'))
                .catch(error => setErrors(error))
        }

    }
    return (<>
        <div className="container mt-5">
            <div className="card shadow">
                <div className="card-header bg-primary text-white">
                    <h3>{id ? "Create Story" : "Edit Story"}</h3>
                </div>
                <div>
                    <form onSubmit={handleSubmit}>
                        <div >
                            <label className="form-label">Title:</label>
                            <input
                                type="text"
                                name="title"
                                className="form-control"
                                value={formData.title}
                                onChange={updateFormData}
                                required
                            />
                        </div>
                        <div>
                            <label className="form-label">Author:</label>
                            <input
                                type="text"
                                name="author"
                                className="form-control"
                                value={formData.author}
                                onChange={updateFormData}
                                required
                            />
                        </div>
                        <div >
                            <label className="form-label">Genre:</label>
                            <select
                                name="genre"
                                className="form-select"
                                value={formData.genre}
                                onChange={updateFormData}
                                required
                            >
                                <option value="" disabled>Choose Genre</option>
                                <option value="Horror">Horror</option>
                                <option value="Romance">Romance</option>
                                <option value="Fantasy">Fantasy</option>
                                <option value="Fiction">Fiction</option>
                                <option value="Non-Fiction">Non-Fiction</option>
                                <option value="Historical">Historical</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Story:</label>
                            <textarea
                                name="story"
                                className="form-control"
                                rows="6"
                                value={formData.story}
                                onChange={updateFormData}
                                required
                            ></textarea>
                        </div>

                        <button className="btn btn-success w-100">
                            {id ? "Create Story" : "Save Changes"}
                        </button>
                        {errors.length > 0 && (
                            <div className="alert alert-danger mt-2">
                                <ul className="mb-0">
                                    {errors.map((err, i) => (
                                        <li key={i}>{err}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    </>)
}
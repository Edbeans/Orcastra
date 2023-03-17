import { updateIdea } from "../../store/idea"
import { useDispatch } from "react-redux"
import { useState } from "react"
import './EditIdeaModal.css'

export default function EditModalForm({ idea }) {
    const [title, setTitle] = useState(idea.title)
    const [body, setBody] = useState(idea.body)
    const [images, setImages] = useState(idea.images)
    const dispatch = useDispatch()

    const handleSubmit = () => {
        let newIdea = {...idea, title, body, images}
        dispatch(updateIdea(newIdea))
    }
    
    return (
        <div className="edit-card-container">
            <form className="edit-card" onSubmit={handleSubmit}>
                <div className="edit-card-title">
                    <input 
                        className="cip-card-inputs"
                        id="cip-input-title"
                        type="text" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)}
                        />
                    <span className="cip-card-labels">Edit title</span>
                </div>
                <div className="cip-card-description">
                    <textarea 
                        className="cip-card-inputs"
                        id="cip-input-description"
                        type="text" 
                        value={body} 
                        onChange={(e) => setBody(e.target.value)} 
                        />
                    <span className="cip-card-labels">Edit description</span>
                </div>

                <button className="submit-idea-btn">Edit Idea</button>
            </form>
        </div>
    )
}
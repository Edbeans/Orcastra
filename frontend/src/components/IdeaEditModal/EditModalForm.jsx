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
        <div className="edit-idea-modal-wrapper">
        {/* data-aos="fade-up" data-aos-duration="2000" */}
            <form className="edit-card" onSubmit={handleSubmit}>
                <div>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
                    <span>Edit title</span>
                </div>
                <div>
                    <input type="text" value={body} onChange={(e) => setBody(e.target.value)} style={{height:'100px', width: '300px'}}/>
                    <span>Edit description</span>
                </div>

                <button className="submit-idea-btn">Edit Idea</button>
            </form>
        </div>
    )
}
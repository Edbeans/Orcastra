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
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Edit title</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
                </div>
                <div>
                    <label>Edit description</label>
                    <input type="text" value={body} onChange={(e) => setBody(e.target.value)} style={{height:'100px', width: '300px'}}/>
                </div>

                <button>Edit Idea</button>
            </form>
        </div>
    )
}
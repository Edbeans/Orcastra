import { updateIdea } from "../../store/idea"
import { useDispatch } from "react-redux"
import { useState } from "react"
import './EditIdeaModal.css'
export default function EditModalForm({ idea }) {
    const [title, setTitle] = useState(idea.title)
    const [body, setBody] = useState(idea.body)

    const dispatch = useDispatch()

    const handleSubmit = () => {
        let newIdea = {...idea, title, body}
        dispatch(updateIdea(newIdea))
    }

    return (
        <div className="edit-idea-modal-wrapper">
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Edit title</label>
                    <input type="text" value={idea.title} />
                </div>
                <div>
                    <label>Edit description</label>
                    <input type="text" value={idea.body} />
                </div>
            </form>
        </div>
    )
}
import { fetchIdea, getIdea } from "../../store/idea"
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useState, useEffect } from "react"
import { createComment } from '../../store/comment'
import "./IdeaShowPage.css"
import EditModalButton from "../IdeaEditModal"

export default function IdeaShowPage() {
    const dispatch = useDispatch()
    const [comment, setComment] = useState('');
    const { ideaId } = useParams()
    const idea = useSelector(getIdea(ideaId))



    function handleCommentSubmit(e, errors) {
        e.preventDefault()
        const newComment = { comment }
        if (errors && Object.values(errors).length === 0) {
            return dispatch(createComment(newComment))
        }
    }

    useEffect(() => {
        dispatch(fetchIdea(ideaId))
    }, [dispatch, ideaId])
    if (!idea) {
        return null
    } else {
        return (
            <div className="isp-container">

                <div className="isp-media-container">
                    <div className="isp-image"></div>
                </div>

                <div className="isp-info-container">
                    <div className="isp-title">{idea.title}</div>
                    <div className="isp-description">{idea.body}</div>
                    <div className="isp-actions">
                        <button>Bid</button>
                        <button>Save</button>
                        <button>Contact</button>
                    </div>

                <EditModalButton
                    idea={idea}/>
                </div>

                <div className="isp-comments-container">
                    <form className="isp-create-comment-form" onSubmit={(e) => { handleCommentSubmit(e)}} >
                        <div className='form-input-group'>
                            <textarea className="form-inputs" onChange={(e) => setComment(e.target.value)} required />
                            <span className="form-input-labels">Write your comment here</span>
                        </div>
                        <button>Submit</button>
                    </form>
                    <div className="isp-comments-display">
                        {/* {idea.comments.map((comment) => {
                            <div>{comment.}</div>
                        })} */}
                    </div>
                </div>

            </div>
        )
    }
}
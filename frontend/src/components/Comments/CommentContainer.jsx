import CommentIndexItem from "./CommentIndexItem"
import { useDispatch, useSelector } from "react-redux"
import { createComment } from "../../store/comment"
import { useState } from "react"
import './Comments.css'

export default function CommentContainer({idea}) {
    const dispatch = useDispatch()

    const sessionUser = useSelector(state => state.session.user)

    const [commentText, setCommentText] = useState('');
    let comment = { 
        author: '',
        idea: '',
        text: ''
    }

    if (!sessionUser) {
        return (
            <div className="isp-comments-display">
                {idea.comments.sort((a, b) =>
                    new Date(a.date_created) - new Date(b.date_created)
                ).map((comment) =>
                    // {console.log("test")}
                    // {console.log(comment.text) }
                    <div>
                        <CommentIndexItem comment={comment} />
                    </div>
                )}
            </div>
        )
    } else {
        const author = sessionUser._id
        function handleCommentSubmit(e, errors) {
            e.preventDefault()
            // const newComment = {...comment, author, idea: ideaId, text: commentText}
            const newComment = {...comment, author, idea: idea._id, text: commentText}
            console.log(newComment, idea._Id)
            // comment this out to test reducer
            // if (errors && Object.values(errors).length === 0) {
                return dispatch(createComment(newComment, idea))
            // }
        }
    return (
        
        <div>
            <form className="isp-create-comment-form" onSubmit={(e) => { handleCommentSubmit(e) }} >
                <div className='form-input-group' >
                    <textarea className="form-inputs" id="create-comment-textbox" onChange={(e) => setCommentText(e.target.value)} required />
                    <span className="form-input-labels">Write your comments here</span>
                </div>
                <button className='default-button-1'
                    id='create-comment-submit-button'>Submit
                </button>
            </form>

            <div className="isp-comments-display">
                {idea.comments.sort((a, b) =>
                    new Date(a.date_created) - new Date(b.date_created)
                ).map((comment) =>
                    // {console.log("test")}
                    // {console.log(comment.text) }
                    <div>
                        <CommentIndexItem comment={comment} />
                    </div>
                )}
            </div>
        </div>
    )}
}
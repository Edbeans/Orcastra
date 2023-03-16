import { fetchIdea, getIdea } from "../../store/idea"
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useState, useEffect } from "react"
import { createComment } from '../../store/comment'
import "./IdeaShowPage.css"
import EditModalButton from "../IdeaEditModal"
import { timeConversion } from "../../modules/helperFunctions"
import { margin, width } from "@mui/system"

export default function IdeaShowPage() {
    const dispatch = useDispatch();
    // const [comment, setComment] = useState('');
    const { ideaId } = useParams();

    const sessionUser = useSelector(state => state.session.user)
    const author = sessionUser._id
    const [commentText, setCommentText] = useState('');
    let comment = { 
        author: '',
        idea: '',
        text: ''
    }

    const idea = useSelector(getIdea(ideaId))

    function handleCommentSubmit(e, errors) {
        e.preventDefault()
        // const newComment = {...comment, author, idea: ideaId, text: commentText}
        const newComment = {...comment, author, idea: ideaId, text: commentText}
        console.log(newComment, ideaId)
        // comment this out to test reducer
        // if (errors && Object.values(errors).length === 0) {
            return dispatch(createComment(newComment, idea))
        // }
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
                            <div className="comment-item">
                                <div className="comment-item-user-info">
                                    {/* {comment.author} */}
                                    User Info Goes Here
                                </div>
                                <div className="comment-item-text">
                                    {comment.text}
                                </div>
                                <div className="comment-item-date">
                                    {timeConversion(comment.createdAt)}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        )
    }
}
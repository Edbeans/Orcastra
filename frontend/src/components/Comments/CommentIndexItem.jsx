import { deleteComment } from "../../store/comment"
import { useDispatch } from "react-redux"
import { timeConversion } from "../../modules/helperFunctions"

import './Comments.css'
export default function CommentIndexItem({ key, comment }) {
    const dispatch = useDispatch()

    return (
        <div className='comment-item'>
            <div className='comment-wrapper'>
                <div>
                <div className='comment-item-user-info'>{comment.author.username}</div>
                <div className='comment-item-text'>{comment.text}</div>
                <div className='comment-item-date'>{timeConversion(comment.createdAt)}</div>
                </div>
                <div>
                    <button onClick={()=>dispatch(deleteComment(comment._id))}>delete comment</button>
                </div>
            </div>
        </div>
    )
}
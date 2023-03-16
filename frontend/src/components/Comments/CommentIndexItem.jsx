import { deleteComment } from "../../store/comment"
import { useDispatch } from "react-redux"
export default function CommentIndexItem({comment}){
    const dispatch = useDispatch()
    
    return (
        <div>
            <div>{comment.author.username}</div>
            <div>{comment.text}</div>
            <button onClick={() => dispatch(deleteComment)}>delete comment</button>
        </div>
    )
}
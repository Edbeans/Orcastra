import { fetchIdea, getIdea } from "../../store/idea"
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import "./IdeaShowPage.css"

export default function IdeaShowPage(){ 
    const dispatch = useDispatch()
    const {ideaId} = useParams()
    const idea = useSelector(getIdea(ideaId))

    useEffect(() => {
        dispatch(fetchIdea(ideaId))
    }, [dispatch, ideaId])
    if (!idea) {
        return null 
    } else {
    return ( 
        <div className="isp-container">
        
            <div className="isp-header">
                <div className="isp-title">{idea.title}</div>
                {/* <div className="isp-description">{idea.body}</div> */}
            </div>

            <div className="isp-media-container">
                <div className="isp-image"></div>
            </div>
        
        </div>
    )}
}
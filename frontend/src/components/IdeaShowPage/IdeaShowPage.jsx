import { fetchIdea, getIdea } from "../../store/idea"
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"

export default function IdeaShowPage(){ 
    const dispatch = useDispatch()
    const {ideaId} = useParams()
    const idea = useSelector(getIdea(ideaId))

    useEffect(() => {
        dispatch(fetchIdea(ideaId))
    }, [dispatch, ideaId])

    return ( 
        <div>
        <div>{idea.title}</div>
        <div>{idea.description}</div>
        </div>
    )
}
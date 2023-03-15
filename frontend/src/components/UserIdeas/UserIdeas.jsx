import { fetchUserIdeas, getIdeas, fetchIdeas } from "../../store/idea";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function UserIdeas() {
    const dispatch = useDispatch()
    const {userId} = useParams()
    const ideas = useSelector(getIdeas)
    
    useEffect(()=> { 
        dispatch(fetchIdeas())
    }, [dispatch])

    const filteredIdeas = ideas.filter((idea) => idea.owner._id === userId )
    

    if (!ideas){
        return null
    } else {
        return (
            <div>

            </div>
        )
    }
}
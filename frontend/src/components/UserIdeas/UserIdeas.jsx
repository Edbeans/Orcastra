import { fetchUserIdeas, getIdeas, fetchIdeas } from "../../store/idea";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function UserIdeas() {
    const dispatch = useDispatch()
    const {userId} = useParams()
    const ideas = useSelector(getIdeas)
    console.log('userId', userId)
    console.log('ideas', ideas)

    // useEffect(()=> { 
    //     dispatch(fetchUserIdeas(userId))
    // }, [dispatch, userId])
    useEffect(()=> { 
        dispatch(fetchIdeas())
    }, [dispatch])

    const filteredIdeas = ideas.filter((idea) => idea.owner._id === userId )
    console.log('filteredids', filteredIdeas)

    if (!ideas){
        return null
    } else {
        return (
            <div>

            </div>
        )
    }
}
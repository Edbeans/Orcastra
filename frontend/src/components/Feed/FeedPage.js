import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/session'
import { useHistory } from 'react-router-dom'
import { useEffect } from 'react';
import { fetchIdeas, getIdeas } from '../../store/idea';
import IdeaIndexItem from './IdeaIndexItem';

export default function FeedPage(){
    const dispatch = useDispatch()
    const ideas = useSelector(getIdeas)
    const history = useHistory()
    console.log(ideas)
    useEffect(()=>{
        dispatch(fetchIdeas())
    }, [dispatch])

    return (
        <div>
            <h1>Hello from feed</h1>
            {ideas.map((idea)=> <IdeaIndexItem idea={idea}/>)}
        </div>
    )
}
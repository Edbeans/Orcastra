import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/session'
import { useHistory } from 'react-router-dom'
import { useEffect } from 'react';
import { fetchIdeas, getIdeas } from '../../store/idea';
import IdeaIndexItem from './IdeaIndexItem';
import './Feed.css'
import Aos from 'aos';

export default function FeedPage() {
    const dispatch = useDispatch()
    const ideas = useSelector(getIdeas)
    const history = useHistory()

    useEffect(() => {
        dispatch(fetchIdeas())
    }, [dispatch])

    return (
        <div className='feed-background'>
            <div className='feed-page-wrapper'>
                <div className='feed-wrapper'>
                    {ideas.map((idea) => <IdeaIndexItem idea={idea} />)}
                </div>
            </div>
        </div>
    )
}
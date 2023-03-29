import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { fetchIdeas, getIdeas } from '../../store/idea';
import IdeaIndexItem from './IdeaIndexItem';
import './Feed.css'
import Aos from 'aos';

export default function FeedPage() {
    const dispatch = useDispatch()
    const ideas = useSelector(getIdeas)

    useEffect(() => {
        dispatch(fetchIdeas())
    }, [dispatch])

    return (
        <div className='feed-container'>

            <div className='featured-idea-container'>

            </div>

            <div className='feed-background'>
                <div className='feed-page-wrapper'>
                    <div className='feed-wrapper'>
                        {ideas.slice(1).map((idea) => <IdeaIndexItem idea={idea} key={idea.id} />)}
                    </div>
                </div>
            </div>
        </div>
    )
}
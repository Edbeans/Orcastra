import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { fetchIdeas, getIdeas } from '../../store/idea';
import IdeaIndexItem from './IdeaIndexItem';
import { Link } from 'react-router-dom';
import './Feed.css'
import Aos from 'aos';

export default function FeedPage() {
    const dispatch = useDispatch()
    const ideas = useSelector(getIdeas)
    const [randomizedIdeas, setRandomizedIdeas] = useState(null);

    useEffect(() => {
        // Fetch ideas on mount
        dispatch(fetchIdeas());
    }, [dispatch]);


    useEffect(() => {
        if (ideas) {
            const randomIdeas = ideas.slice().sort(() => Math.random() - 0.5)
            setRandomizedIdeas(randomIdeas)
        }
    }, [ideas])


    return (
        <>
            {randomizedIdeas && randomizedIdeas.length !== 0 && (
                <div className='feed-container'>

                    <div className='feed-upper-container'>
                        <div className='featured-idea-card'>
                            <div className='featured-idea-header'>Today's featured idea:</div>
                            <div className='featured-idea-properties'>
                                <div className='featured-idea-info'>
                                    <div className='featured-idea-title'>{randomizedIdeas[0].title}</div>
                                    <div className='featured-idea-description'>{randomizedIdeas[0].body}</div>
                                </div>

                                <Link to={`/idea/${randomizedIdeas[0]._id}`} className='index-item-link'>
                                    <img className='featured-idea-img' src={randomizedIdeas[0].imageUrls[0]}></img>
                                </Link>
                            </div>
                        </div>

                        <div className='feed-search-card'>

                        </div>
                    </div>


                    <div className='feed-background'>
                        <div className='feed-page-wrapper'>
                            <div className='feed-wrapper'>

                                {randomizedIdeas.slice(1).map((idea) => <IdeaIndexItem idea={idea} key={idea.id} />)}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
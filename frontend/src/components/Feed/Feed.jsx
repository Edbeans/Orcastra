import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import React from 'react';
import { fetchIdeas, getIdeas } from '../../store/idea';
import IdeaIndexItem from './IdeaIndexItem';
import { Link } from 'react-router-dom';
import './Feed.css'
import Aos from 'aos';
import 'aos/dist/aos.css';
import { IncompleteModalContext } from '../../App';
import { useContext } from 'react';

import coins from '../../assets/coins.png';
import conversation from '../../assets/conversation.png';
import lightbulb from '../../assets/lightbulb.png';


export default function FeedPage() {
    const dispatch = useDispatch()
    const ideas = useSelector(getIdeas)
    const [randomizedIdeas, setRandomizedIdeas] = useState(null);
    const icons = [coins, conversation, lightbulb];
    const { showIncompleteModal, setShowIncompleteModal } = useContext(IncompleteModalContext);

    useEffect(() => {
        // Fetch ideas on mount
        dispatch(fetchIdeas());
    }, [dispatch]);

    function sortByNewest() {
        
    }


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
                        <div className='featured-idea-card' data-aos="fade-right" data-aos-duration="1000">
                            <div className='featured-idea-header'>Today's featured idea:</div>
                            <div className='featured-idea-properties'>
                                <div className='featured-idea-info'>
                                    <div className='featured-idea-title'>{randomizedIdeas[0].title}</div>
                                    <div className='featured-idea-author'>
                                        <img className='featured-idea-author-pp' src={randomizedIdeas[0].owner.profileImageUrl}></img>
                                        <div className='featured-idea-author-username'><Link to={`/users/${randomizedIdeas[0].owner._id}/ideas`}>{randomizedIdeas[0].owner.username}</Link></div>
                                    </div>
                                    <div className='featured-idea-description'>{randomizedIdeas[0].body.split(" ").slice(0, 18).join(" ")} ...</div>
                                    <Link to={`/idea/${randomizedIdeas[0]._id}`} >
                                        <span>Read More</span>
                                    </Link>
                                </div>
                                <Link to={`/idea/${randomizedIdeas[0]._id}`} className='index-item-link'>
                                    <img className='featured-idea-img' src={randomizedIdeas[0].imageUrls[0]}></img>
                                </Link>
                            </div>
                        </div>
                        <div className='trending-card' data-aos="fade-right" data-aos-duration="1000">
                            <div className='trending-header'>Trending:</div>
                            <img className='trending-icon' src={icons[Math.floor(Math.random() * icons.length)]}></img>
                            {/* different blurb depending on the icon */}
                            <div className='trending-blurb'>{`${randomizedIdeas[Math.floor(Math.random() * randomizedIdeas.length)].title} has just received a bid for $20m!`}</div>
                        </div>
                    </div>

                    <div className='feed-lower-container'>
                        <select className='feed-filter' data-aos="fade-right" data-aos-duration="1000" onChange={() => setShowIncompleteModal(true)}>
                            <option value="" disabled selected>Filter by:</option>
                            <option value="option1">Most Bids</option>
                            <option value="option2">Highest Bid</option>
                            <option value="option3">Most Viewed</option>
                            <option value="option4">Most Commented</option>
                            <option value="option5">Newest</option>
                            <option value="option6">Oldest</option>
                        </select>

                        <div className='feed-background'>
                            <div className='feed-wrapper'>

                                {randomizedIdeas.slice(1).map((idea, index) => {
                                    let ideaIndexOrder;
                                    if (index % 4 === 0) {
                                        ideaIndexOrder = 'index-item-order1';
                                    } else if (index % 4 === 1) {
                                        ideaIndexOrder = 'index-item-order2';
                                    } else if (index % 4 === 2) {
                                        ideaIndexOrder = 'index-item-order3';
                                    } else {
                                        ideaIndexOrder = 'index-item-order4';
                                    }

                                    return <IdeaIndexItem idea={idea} ideaIndexOrder={ideaIndexOrder} key={idea.id} />;
                                })}

                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
import { fetchUserIdeas, getIdeas, fetchIdeas } from "../../store/idea";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import UserIdeaIndexItem from "./UserIdeaIndexItem";
import './UserShow.css'

export default function UserIdeas() {
    const dispatch = useDispatch()
    const {userId} = useParams()
    const ideas = useSelector(getIdeas)
    const user = useSelector((state) => state.session.user);

    
    useEffect(()=> { 
        dispatch(fetchIdeas())
    }, [dispatch])

    const filteredIdeas = ideas.filter((idea) => idea.owner._id === userId )
    
    return (
        <>
            {/* <div className="usershow-container" data-aos="fade-up" data-aos-duration="1000">
                <div className="usershow-content">

                    <div className="usershow-info-header">
                        <div className="usershow-profile-img">
                        </div>
                        <div className="usershow-username-container">
                            <div className="usershow-username">
                                {user.username}
                            </div>
                            <div className="usershow-email">
                                {user.email}
                            </div>
                        </div>

                        <div className="usershow-stats">
                            <div className="usershow-num-ideas">{`Ideas: ${filteredIdeas.length}`}</div>
                            <div className="usershow-num-comments">{`Comments Received: ${filteredIdeas.length}`}</div>
                        </div>    
                        
                    </div>

                    <div className="usershow-ideas">
                        <div className="usi-header">
                            <h1 className="usi-header-text">Your Ideas:</h1>
                        </div>
                        {console.log("FILTERED", filteredIdeas)}
                        {filteredIdeas.map(idea => <UserIdeaIndexItem idea={idea} />)}
                    </div>

                </div>
            </div> */}
            <div className='usp'>

                <div className='usp-main'>
                    {/* MAIN CONTENT OF SHOW PAGE */}
                    <div className='usp-main-container'>
                        {/* USER STORIES      */}
                        <main className='main-class'>
                            <div className='usp-right-container'>
                                <div className='user-header-container'>
                                    <h1 className='user-name'>{`${user.username}'s ideas`}</h1>       
                                </div>
                                
                                    {filteredIdeas.map(idea =>
                                        <UserIdeaIndexItem key={idea.id} idea={idea}/>
                                    )}

                            </div>
                        </main>
                        {/* USER BIO AND INFORMATION  */}
                        <div className='sp-left-container'>
                            <div className='author-bio-container'>
                                <div className='author-bio-inside-container'>
                                    <div className='author-bio-content'>
                                        <div className='abc-1'>
                                            <div className='abc-2'>
                                                <div className="usershow-profile-img" />
                                                <div className='profile-name'>{user.username}</div>
                                                <div className="usershow-stats">
                                                    <div className="usershow-num-ideas">{`Ideas: ${filteredIdeas.length}`}</div>
                                                    <div className="usershow-num-comments">{`Comments received: ${filteredIdeas.length}`}</div>
                                                </div>  
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
            
        </>
    )


    // if (!ideas){
    //     return null
    // } else {
    //     return (
    //         <div>
                
    //         </div>
    //     )
    // }
}
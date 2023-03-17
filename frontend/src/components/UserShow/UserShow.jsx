import { fetchUserIdeas, getIdeas, fetchIdeas } from "../../store/idea";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
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
            <div className="usershow-container">
                <div className="usershow-content">

                    <div className="usershow-info-header">
                        <div className="usershow-profile-img">
                            Image Goes here
                        </div>
                        <div className="usershor-username-container">
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
                        Ideas here
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
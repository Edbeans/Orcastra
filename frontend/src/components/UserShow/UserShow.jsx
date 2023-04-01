import {
  fetchUserIdeas,
  getIdeas,
  fetchIdeas,
} from '../../store/idea';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UserIdeaIndexItem from './UserIdeaIndexItem';
import Aos from 'aos';
import './UserShow.css';
import { getUser, fetchUser } from '../../store/user';

export default function UserIdeas() {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const ideas = useSelector(getIdeas);
  // const user = useSelector((state) => state.session.user);
  const user = useSelector(state=> state.users)

  useEffect(() => {
    dispatch(fetchIdeas());
    dispatch(fetchUser(userId))
  }, [dispatch, userId]);

  const filteredIdeas = ideas.filter(
    (idea) => idea.owner._id === userId
  );

  const receivedBids = filteredIdeas.map((idea) => idea.bids);

  const receivedComments = filteredIdeas.map((idea) => idea.comments);

  
if (!user) {
  return null
} else {
  const numUserBids = user.bids;
  const numUserComments = user.comments;

  return (
    
    <>
      <div className='usp'>
        <div className='usp-main'>
          {/* MAIN CONTENT OF SHOW PAGE */}
          <div className='usp-main-container'>
            {/* USER STORIES      */}
            <main className='main-class'>
              <div className='usp-right-container'>
                <div className='user-header-container'>
                  <h1
                    className='user-name'
                    data-aos='fade-down'
                    data-aos-duration='1500'
                  >{`${user.username}'s ideas`}</h1>
                </div>

                {filteredIdeas.map((idea) => (
                  <UserIdeaIndexItem key={idea.id} idea={idea} />
                ))}
              </div>
            </main>
            {/* USER BIO AND INFORMATION  */}
            <div
              className='sp-left-container'
              data-aos='fade-left'
              data-aos-duration='1500'
            >
              <div className='user-bio-container'>
                <div className='user-bio-inside-container'>
                  <div className='user-bio-content'>
                    <div className='ubc-1'>
                      <div className='ubc-2'>
                        <div className='usershow-profile-img' />
                        <div className='profile-name'>
                          {user.username}
                        </div>
                        <div className='usershow-stats'>
                          <div className='usershow-num-ideas'>{`Ideas: ${filteredIdeas.length}`}</div>
                          <div className='usershow-num-comments'>{`Comments received: ${receivedComments.length}`}</div>
                          <div className='usershow-num-comments'>{`Bids received: ${receivedBids.length}`}</div>
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
  );
}
}
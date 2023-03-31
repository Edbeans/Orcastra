import { deleteIdea, fetchIdea, getIdea } from '../../store/idea';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import {
  createComment,
  fetchIdeaComments,
} from '../../store/comment';
import { useHistory } from 'react-router-dom';
import './IdeaShowPage.css';
import BidModalButton from '../IdeaBidModal';
import EditModalButton from '../IdeaEditModal';
import { margin, width } from '@mui/system';
import CommentContainer from '../Comments/CommentContainer';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AOS from 'aos';
import { fetchIdeaBids, getBids } from '../../store/bid';

export default function IdeaShowPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  // const [comment, setComment] = useState('');
  // const { bidId } = useParams();
  const bids = useSelector((state) => Object.values(state.bids));
  const { ideaId } = useParams();
  const idea = useSelector(getIdea(ideaId));
  const sessionUser = useSelector((state) => state.session.user);
  const [currImg, setCurrImg] = useState(0);

  function incrementImage() {
    if (currImg === idea.imageUrls.length - 1) {
      setCurrImg(0);
    } else {
      setCurrImg(currImg + 1);
    }
  }

  function decrementImage() {
    if (currImg === 0) {
      setCurrImg(idea.imageUrls.length - 1);
    } else {
      setCurrImg(currImg - 1);
    }
  }

  useEffect(() => {
    dispatch(fetchIdea(ideaId));
    dispatch(fetchIdeaBids(ideaId));
  }, [dispatch, ideaId]);

  function handleDelete() {
    dispatch(deleteIdea(ideaId)).then(history.push('/feed'));
  }

  if (!idea) {
    return null;
  } else {
    return (
      <>
        <div className='isp-container'>
          <div className='isp-info-container'>
            <div
              className='isp-title'
              data-aos='fade-down'
              data-aos-duration='2000'
            >
              {idea.title}
            </div>

            <div
              className='isp-username'
              data-aos='fade-down'
              data-aos-duration='2000'
            >
              <img
                className='comment-profile-image'
                src={idea.owner.profileImageUrl}
              />
              Product by: {idea.owner.username}
            </div>

            <div
              className='description-container'
              data-aos='fade-right'
              data-aos-duration='2000'
            >
              <div className='description-box'>
                <div className='isp-description'>{idea.body}</div>
              </div>
            </div>
          </div>

          <div
            className='isp-media-container'
            data-aos='fade-left'
            data-aos-duration='2000'
          >
            <div className='hb-container'>
              {/* Get the highest bid of the current idea and the investor who made that bid */}
              <h2 className='hb-data'>
                CURRENT HIGHEST BID:{' '}
                {
                  bids
                    .map((bid) => bid.bidAmount)
                    .sort((a, b) => b - a)[0]
                }
                {/* Logged in users can make bids  */}
                {sessionUser && (
                  <button className='idea-show-button bid-modal'>
                    <BidModalButton idea={idea} />
                  </button>
                )}
              </h2>
            </div>

            <div
              className='media'
              style={{
                backgroundImage: `url(${idea.imageUrls[currImg]})`,
              }}
            >
              <div className='media-button-wrapper'>
                <div className='left-media' onClick={decrementImage}>
                  <ChevronLeftIcon />
                </div>
              </div>
              <div className='center-media'></div>
              <div className='media-button-wrapper'>
                <div className='right-media' onClick={incrementImage}>
                  <ChevronRightIcon />
                </div>
              </div>
            </div>
            <div className='media-gallery-wrapper'>
              <div className='media-gallery'>
                {idea.imageUrls.map((url, index) => (
                  <div className='gallery-image-item'>
                    <img
                      className='gallery-image'
                      src={url}
                      onClick={() => setCurrImg(index)}
                    ></img>{' '}
                  </div>
                ))}
              </div>
            </div>
            <div className='isp-actions'>

              {sessionUser && sessionUser._id === idea.owner._id ? (
                <div className='de-btn-container'>
                  <div className='de-btn'>
                    <button
                      className='idea-show-button'
                      onClick={handleDelete}
                    >
                      Delete
                    </button>
                  </div>
                  <div className='de-btn e-btn'>
                    <button className='idea-show-button'>
                      <EditModalButton idea={idea} />
                    </button>
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>

        <div className='bids-and-comments'>
          <div className='isp-comments-div'>
            <div className='isp-comments-container'>
              <CommentContainer idea={idea} />
            </div>
          </div>
          <div className="bids-container">
            BIDS GO HERE
          </div>
        </div>

      </>
    );
  }
}

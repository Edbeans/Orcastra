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
import EditModalButton from '../IdeaEditModal';
import { margin, width } from '@mui/system';
import CommentContainer from '../Comments/CommentContainer';

export default function IdeaShowPage() {
    const dispatch = useDispatch();
    const history = useHistory()
    // const [comment, setComment] = useState('');
    const { ideaId } = useParams();
    const idea = useSelector(getIdea(ideaId));

    useEffect(() => {
        dispatch(fetchIdea(ideaId));
    }, [dispatch, ideaId]);

    function handleDelete() {
        dispatch(deleteIdea(ideaId)).then(history.push('/feed'))
    }

    if (!idea) {
        return null;
    } else {
        return (
            <div className='isp-container'>
                <div className='isp-media-container'>
                    <div className='isp-image'></div>
                </div>

                <div className='isp-info-container'>
                    <div className='isp-title'>{idea.title}</div>
                    <div className='isp-description'>{idea.body}</div>
                    <div className='isp-actions'>
                        <button>Bid</button>
                        <button>Save</button>
                        <button>Contact</button>
                        <button onClick={handleDelete}>Delete</button>
                    </div>

                    <EditModalButton idea={idea} />
                </div>

                <div className='isp-comments-container'>
                    <CommentContainer idea={idea} />
                </div>
            </div>
        );
    }
}

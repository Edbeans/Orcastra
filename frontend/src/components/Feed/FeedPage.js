import { useDispatch } from 'react-redux';
import { logout } from '../../store/session'
import { useHistory } from 'react-router-dom'
export default function FeedPage(){
    const dispatch = useDispatch()
    const history = useHistory()

    const handleClick = (e) => {
        e.preventDefault()
        dispatch(logout())
        history.push('/login')
    }

    return (
        <div>
            <h1>Hello from feed</h1>
            <button onClick={handleClick}>logout</button>
        </div>
    )
}
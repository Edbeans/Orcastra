import './LoginModal.css';
import { useState, useEffect } from 'react';
import { login, clearSessionErrors } from '../../../store/session';
import { useDispatch } from 'react-redux';
export default function LoginForm(props) {
    const dispatch = useDispatch()
    const showLoginModal = props.showLoginModal
    const setShowLoginModal = props.setShowLoginModal
    const setShowSignUpModal = props.setShowSignUpModal
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);


    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(login({username, password}))
    }

    return (
        <div className='login-modal-background'>
            <div className="login-modal">
                <form onSubmit={handleSubmit}>
                    <h2>Log in</h2>
                    <div>
                        <label/> Username or Email
                    </div>
                    <div>
                        <input type="text" onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div>
                        <label>Password</label>
                    </div>
                    <div>
                        <input type="password" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div>
                        <button>Log in</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

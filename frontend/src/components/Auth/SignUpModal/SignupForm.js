import './SignUpModal.css';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { signup, clearSessionErrors } from '../../../store/session';

export default function SignUpForm(props) {
    const showSignUpModal = props.showSignUpModal
    const setShowLoginModal = props.setShowLoginModal
    const setShowSignUpModal = props.setShowSignUpModal
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const dispatch = useDispatch()

    useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);


    const handleSubmit = (e) => {
        e.preventDefault()
        const user = {
            email,
            username,
            password
        }
        dispatch(signup(user))
    }

    return (
        <div className='login-modal-background'>
            <div className="login-modal">
                <form onSubmit={handleSubmit}>
                    <div>
                        <label /> Username
                    </div>
                    <div>
                        <input type="text" onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div>
                        <label /> Email
                    </div>
                    <div>
                        <input type="text" onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <label>Password</label>
                    </div>
                    <div>
                        <input type="password" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div>
                        <label>Confirm Password</label>
                    </div>
                    <div>
                        <input type="password" onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>
                    <div>
                        <button>Sign Up</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

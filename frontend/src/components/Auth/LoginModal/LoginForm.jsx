import './LoginModal.css';
import { useState, useEffect, useContext } from 'react';
import { login, clearSessionErrors } from '../../../store/session';
import { useDispatch } from 'react-redux';
import { ModalContext } from '../../Navigation/Sidebar';
import { padding } from '@mui/system';

export default function LoginForm(props) {
    const dispatch = useDispatch()
    const showLoginModal = props.showLoginModal
    const setShowLoginModal = props.setShowLoginModal
    const setShowSignUpModal = props.setShowSignUpModal
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        return () => {
            dispatch(clearSessionErrors());
        };
    }, [dispatch]);

    const toggleForm = () => {
        setShowLoginModal(false)
        setShowSignUpModal(true)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(login({ email, password }))
    }

    return (
        <div className='modal-background'>
            <button className="modal-close-button" onClick={() => setShowLoginModal(false)}>&#10005;</button>
            <div className="login-signup-modal">
                <form className="login-signup-form" onSubmit={handleSubmit}>
                    <h2 style={{ fontSize: '36px', textAlign: 'center', padding: '15px' }}>Welcome back.</h2>
                    <div className="input-container">

                        <div className='form-input-group'>
                            <input className="form-inputs" type="text" onChange={(e) => setEmail(e.target.value)} required />
                            <span className="form-input-labels">Username / Email</span>
                        </div>

                        <div className='form-input-group'>
                            <input className="form-inputs" type="password" onChange={(e) => setPassword(e.target.value)} required />
                            <span className="form-input-labels">Password</span>
                        </div>

                        <button className='default-button-1' 
                        style={{ padding: "10px 50px", marginTop: "35px" }} 
                        onClick={handleSubmit}>Log in</button>

                    </div>
                </form>
                <button
                    className='default-button-1'
                    style={{ padding: "10px 50px", marginBottom: "10px" }}
                    type='submit'
                    onClick={(e) => {
                        e.preventDefault();
                        dispatch(
                            login({ email: 'demo@gmail.com', password: 'password' })
                        );
                    }}>
                    Login as Demo User
                </button>
                <div className="lts-container">Don't have an account yet? 
                    <span> </span> 
                    <span className="login-to-signup-link" onClick={toggleForm}>Sign up here</span>
                </div>
            </div>

        </div>
    )
}

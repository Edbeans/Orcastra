import './LoginModal.css';
import { Modal } from '../../../context/modal';
import { useState } from 'react';
import LoginForm from './LoginForm';

export default function LoginModal(props) {
    const showLoginModal = props.showLoginModal
    const setShowLoginModal = props.setShowLoginModal
    const setShowSignUpModal = props.setShowSignUpModal

    return (
        <div>
            <button className="login-modal-button" onClick={() => setShowLoginModal(true)}>Log in</button>
            {showLoginModal && (
                <Modal onClose={() => setShowLoginModal(false)}>
                    <LoginForm
                        showLoginModal={showLoginModal}
                        setShowLoginModal={setShowLoginModal}
                        setShowSignUpModal={setShowSignUpModal}/>
                </Modal>
            )}
        </div>
    )
}
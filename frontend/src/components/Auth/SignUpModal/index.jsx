import { Modal } from '../../../context/modal'
import './SignUpModal.css'
import SignUpForm from './SignupForm'
import { useContext } from 'react'
import { LoginModalContext } from '../../../App';
import React from 'react';


export default function SignUpModal() {

    const { showLoginModal, setShowLoginModal, showSignUpModal, setShowSignUpModal } = useContext(LoginModalContext)
    return (
        <div>
            {showSignUpModal && (
                <Modal onClose={() => setShowSignUpModal(false)}>
                    <SignUpForm
                        showSignUpModal={showSignUpModal}
                        setShowLoginModal={setShowLoginModal}
                        setShowSignUpModal={setShowSignUpModal} />
                </Modal>
            )}
        </div>
    )
}
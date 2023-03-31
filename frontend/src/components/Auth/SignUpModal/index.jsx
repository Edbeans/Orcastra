import { Modal } from '../../../context/modal'
import './SignUpModal.css'
import SignUpForm from './SignupForm'
import { useContext } from 'react'
import { LoginModalContext } from '../../../App';
import React from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';


export default function SignUpModal() {

    const { showLoginModal, setShowLoginModal, showSignUpModal, setShowSignUpModal } = useContext(LoginModalContext)
    return (
        <div>
            {/* <div className="sideitem" onClick={() => setShowSignUpModal(true)}><div className='item-icon'>
            <AddCircleIcon /><span className='item-icon-tooltip'>Sign up</span></div>
                <span className={open ? "linkText" : "linkTextClosed"}>Sign up</span>
            </div> */}

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
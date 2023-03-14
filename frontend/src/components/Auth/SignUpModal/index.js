import { Modal } from '../../../context/modal'
import './SignUpModal.css'
import SignUpForm from './SignupForm'

export default function SignUpModal(props) {
    const showSignUpModal = props.showSignUpModal
    const setShowSignUpModal = props.setShowSignUpModal
    const setShowLoginModal = props.setShowLoginModal

    return (
        <div>
            <div>
                <button className="login-modal-button" onClick={() => setShowSignUpModal(true)}>Sign Up</button>
                {showSignUpModal && (
                    <Modal onClose={() => setShowSignUpModal(false)}>
                        <SignUpForm
                            showSignUpModal={showSignUpModal}
                            setShowLoginModal={setShowLoginModal}
                            setShowSignUpModal={setShowSignUpModal} />
                    </Modal>
                )}
            </div>
        </div>
    )
}
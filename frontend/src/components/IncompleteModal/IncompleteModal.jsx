
import { useContext } from "react"
import { IncompleteModalContext } from "../../App";
import { Modal } from "../../context/modal"
import './IncompleteModal.css'

export default function IncompleteModal() {

    const { showIncompleteModal, setShowIncompleteModal } = useContext(IncompleteModalContext);

    return (
        <>
            {showIncompleteModal && (
                <Modal onClose={() => setShowIncompleteModal(false)}>
                    <div className="modal-background" style={{ width: '600px', height: '500px' }}>
                    <button className="modal-close-button" onClick={() => setShowIncompleteModal(false)}>&#10005;</button>
                        <div className="incomplete-container">
                            <div className="incomplete-sorry-msg">Blubber!</div>
                            {/* <img></img> */}
                            <div className="incomplete-blurb-msg">Our team is working on getting this feature to you as soon as we can.</div>
                        </div> 
                    </div>
                </Modal>
            )}
        </>
    )
}
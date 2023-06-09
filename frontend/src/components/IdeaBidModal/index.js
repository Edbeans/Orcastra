import { useState } from 'react';
import BidModalForm from './BidModalForm';
import { Modal } from '../../context/modal';
import './BidModalForm';

export default function BidModalButton({ idea }) {
  const [openBidModal, setOpenBidModal] = useState(false);

  return (
    <div>
      <div onClick={() => setOpenBidModal(true)}>Create Bid</div>
      {openBidModal && (
        <Modal onClose={() => setOpenBidModal(false)}>
          <BidModalForm
            idea={idea}
            setOpenBidModal={setOpenBidModal}
          />
        </Modal>
      )}
    </div>
  );
}

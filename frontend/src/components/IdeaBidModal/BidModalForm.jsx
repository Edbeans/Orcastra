import { createBid } from '../../store/bid';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import './BidModalForm.css';

export default function BidModalForm({ setOpenBidModal, idea }) {
  const sessionUser = useSelector((state) => state.session.user);
  const bidder = sessionUser._id;
  const bids = useSelector((state) => Object.values(state.bids));
  const bidAmounts = bids.map((bid) => bid.bidAmount);
  const [bidAmount, setBidAmount] = useState(
    bidAmounts.sort((a, b) => b - a)[0]
  );

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    let newBid = {
      bidder,
      idea: idea._id,
      bidAmount: bidAmount,
    };
    dispatch(createBid(newBid));
    setOpenBidModal(false);
  };

  return (
    <div className='bid-card-container'>
      <form className='bid-card' onSubmit={handleSubmit}>
        <input
          className='cip-card-inputs'
          type='number'
          value={bidAmount}
          onChange={(e) => setBidAmount(e.target.value)}
        />

        <button>Bid!</button>
      </form>
    </div>
  );
}

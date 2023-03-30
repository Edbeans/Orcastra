import { createBid } from "../../store/bid";
import { useDispatch } from "react-redux";
import { useState } from "react"; 
import './BidModalForm.css';

export default function BidModalForm({ idea }) {
    const [bidAmount, setBidAmount] = useState(idea.bidAmount);
    const dispatch = useDispatch(); 

    const handleSubmit = () => {
        let newBid = { ...idea, bidAmount }; 
        dispatch(createBid(newBid));
    }

    return (
        <div className="edit-card-container">
            <form className="edit-card" onSubmit={handleSubmit}>
                <input 
                    className="cip-card-inputs"
                    type="number"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                />

                <button>Bid!</button>
            </form>
        </div>
    )
}
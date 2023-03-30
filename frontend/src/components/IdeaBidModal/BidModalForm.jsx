import { useDispatch } from "react-redux";
import { useState } from "react"; 
import './BidModalForm.css';

export default function BidModalForm({ idea }) {
    const [bidAmount, setBidAmount] = useState(idea.bidAmount);
    const dispatch = useDispatch(); 

    const handleSubmit = () => {
        let newBid = { ...idea, bidAmount }; 
        // Add back in later when reducer is made 
        // dispatch(createBid(newBid));
    }

    return (
        <>
            <form onSubmit={handleSubmit}>

                <input 
                    type="number"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                />

                <button>Bid!</button>
            </form>
        </>
    )
}
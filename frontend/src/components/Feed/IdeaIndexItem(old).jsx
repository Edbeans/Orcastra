import { Link } from "react-router-dom"
import './IndexItem.css'
export default function IdeaIndexItem({ idea }) {
    return (
        <div className='index-item-wrapper'>
            <Link to={`/idea/${idea._id}`} className='index-item-link'>
                <img className='placeholder-box' src={idea.imageUrls[0]}></img>

                <h1 className="index-item-title">{idea.title}</h1>

            </Link>
            {/* {idea.body} */}
        </div>
    )
}
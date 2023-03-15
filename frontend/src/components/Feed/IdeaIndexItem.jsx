import { Link } from "react-router-dom"
export default function IdeaIndexItem({idea}) {
    return (
        <div>
            <Link to={`/idea/${idea._id}`}>
            {idea.title}</Link>
            {idea.body}
        </div>
    )
}
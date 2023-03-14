
import "./CreateIdeaPage.css";

export default function CreateIdeaPage() {

    function handleCipSubmit() {

    }

    return (
        <div className="cip-container">
            Test

            <div className="cip-header-container">
                <div className="cip-header">
                    Your billion-dollar venture starts here.
                </div>
                {/* <div className="cip-instructions">
                    Great products were meant to be shared. Fill out the form below with your product information
                </div> */}
            </div>

            <div className="cip-card-container">
                <form className="cip-card" onSubmit={handleCipSubmit}>
                    <div className="cip-card-title">
                        <label to="cip-title">Title</label>
                        <input type="text" id="cip-title"></input>
                    </div>
                    <div className="cip-card-description">
                        Description
                    </div>
                    <button>Submit Idea</button>
                </form>
            </div>

            {/* maybe? */}
            <div className="cip-river-container">

            </div>
        </div>

    )

}
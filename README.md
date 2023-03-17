## Orcastra

[Orcastra](https://orcastra.onrender.com) is a custom web application that allows new inventors to post their ideas and have others comment on their ideas to see if they want to be a part of their venture! With Orcastra users are able to communicate with each other through a commenting system, post images about prototypes or their team, and provide background information on your projects so others know what you are striving towards.

![splashpage](https://user-images.githubusercontent.com/116383442/224833430-54153164-b324-4feb-9d51-47ecbf02586e.gif)

## Technologies

In order to build Orcastra we used a React-Redux frontend, a Node-Express backend, and MongoDB/Mongoose as the DBMS. For formatting and styling we used CSS, [MUI](https://mui.com) for the icons, and [AOS](https://michalsnik.github.io/aos/) for the scrolling animations.

## Key Features

### Creating Ideas

### Logged in users can add comments to ideas.

### Owner of comment is able to edit and delete comments.

## Significant Code

### Maintaining a normalized state when fetching comments for ideas and users.

```javascript
// /frontend/src/store/comment.js
const commentsReducer = (state = {}, action) => {
  let newState = { ...state };
  switch (action.type) {
    case RECEIVE_COMMENTS:
      return { ...state, ...action.comments };
    case RECEIVE_COMMENT:
      return { ...newState, [action.comment._id]: action.comment };
    case RECEIVE_USER_COMMENTS:
      return { ...newState, ...action.comments };
    case RECEIVE_IDEA_COMMENTS:
      const ideaComments = {};
      for (let comment of action.comments) {
        ideaComments[comment._id] = comment;
      }
      return ideaComments;
    case UPDATE_IDEA_COMMENT:
      newState[action.comment._id] = action.comment;
      return newState;
    case REMOVE_COMMENT:
      delete newState[action.commentId];
      return newState;
    default:
      return state;
  }
};
```

### Fetching all comments with associated author id, username, and profile image

```javascript
// /backend/routes/api/comments.js
router.get('/ideas/:ideaId', async (req, res) => {
  let idea;
  try {
    idea = await Idea.findById(req.params.ideaId);
    const ideaComments = await Comment.find({ idea: idea._id })
      .sort({ createdAt: -1 })
      .populate({
        path: 'author',
        select: '_id username profileImageUrl',
      });
    return res.json(ideaComments);
  } catch (error) {
    const err = new Error('No idea with that id found');
    err.statusCode = 404;
    err.errors = { message: 'No idea with that id found' };
    return next(error);
  }
});
```

### Rendering a user's show page

```jsx
// /frontend/src/components/UserShow/UserShow.jsx
<>
  <div className='usp'>
    <div className='usp-main'>
      {/* MAIN CONTENT OF SHOW PAGE */}
      <div className='usp-main-container'>
        {/* USER STORIES      */}
        <main className='main-class'>
          <div className='usp-right-container'>
            <div className='user-header-container'>
              <h1
                className='user-name'
                data-aos='fade-down'
                data-aos-duration='1500'
              >{`${user.username}'s ideas`}</h1>
            </div>

            {filteredIdeas.map((idea) => (
              <UserIdeaIndexItem key={idea.id} idea={idea} />
            ))}
          </div>
        </main>
        {/* USER BIO AND INFORMATION  */}
        <div
          className='sp-left-container'
          data-aos='fade-left'
          data-aos-duration='1500'
        >
          <div className='user-bio-container'>
            <div className='user-bio-inside-container'>
              <div className='user-bio-content'>
                <div className='ubc-1'>
                  <div className='ubc-2'>
                    <div className='usershow-profile-img' />
                    <div className='profile-name'>
                      {user.username}
                    </div>
                    <div className='usershow-stats'>
                      <div className='usershow-num-ideas'>{`Ideas: ${filteredIdeas.length}`}</div>
                      <div className='usershow-num-comments'>{`Comments received: ${filteredIdeas.length}`}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</>
```

## Future Implementations

- Bidding system
- Allow owners of ideas to add valuations to their ideas/companies.
- Allow users to upload videos of their projects in action.
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { AuthRoute, ProtectedRoute } from "./components/Routes/Routes";
import { NavLink, Switch, Route } from "react-router-dom";
import LoginSignUpPage from './components/Auth/LoginSignUpPage'
import { getCurrentUser } from './store/session';
import FeedPage from './components/Feed/FeedPage';
import Sidebar from './components/Navigation/Sidebar';
import CreateIdeaPage from './components/CreateIdeaPage';
import IdeaShowPage from './components/IdeaShowPage/IdeaShowPage';
import UserIdeas from './components/UserIdeas/UserIdeas';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false)
  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);

  return (
    loaded && (
      <>
      <Sidebar
        open={open} setOpen={setOpen}/>
        <div className={open?"padding-containerOpen":"padding-containerClosed"}>
        <Switch>
          <ProtectedRoute exact path='/' component={FeedPage} />
          <Route exact path='/ideas/new' component={CreateIdeaPage}/>
          <Route exact path='/idea/:ideaId' component={IdeaShowPage}/>
          <Route exact path='/users/:userId/ideas' component={UserIdeas}/>
          <AuthRoute exact path='/' component={LoginSignUpPage} />
          <AuthRoute exact path='/login' component={LoginSignUpPage} />
          <AuthRoute exact path='/signup' component={LoginSignUpPage} />
        </Switch>
        </div>
      </>
    )
  );
}

export default App;

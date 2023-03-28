import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  AuthRoute,
  ProtectedRoute,
} from './components/Routes/Routes';
import { NavLink, Switch, Route, Redirect } from 'react-router-dom';
import Splash from './components/Splash/Splash';
import { getCurrentUser } from './store/session';
import FeedPage from './components/Feed/FeedPage';
import Sidebar from './components/Navigation/Sidebar';
import CreateIdeaPage from './components/CreateIdeaPage/CreateIdeaPage';
import IdeaShowPage from './components/IdeaShowPage/IdeaShowPage';
import UserShow from './components/UserShow/UserShow';
import ErrorPage from './components/NotFound/ErrorPage';
import Footer from './components/Footer/Footer';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
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
            <Route exact path='/feed' component={FeedPage} />
            <ProtectedRoute exact path='/ideas/new' component={CreateIdeaPage}/>
            <Route exact path='/idea/:ideaId' component={IdeaShowPage}/>
            <ProtectedRoute exact path='/users/:userId/ideas' component={UserShow}/>
            <Route exact path='/' component={Splash} />
            <AuthRoute exact path='/login' component={Splash} />
            <AuthRoute exact path='/signup' component={Splash} />
          </Switch>
          <Footer />
        </div>
      </>
    )
  );
}

export default App;

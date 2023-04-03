import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  AuthRoute,
  ProtectedRoute,
} from './components/Routes/Routes';
import { NavLink, Switch, Route, Redirect } from 'react-router-dom';
import Splash from './components/Splash/Splash';
import { getCurrentUser } from './store/session';
import FeedPage from './components/Feed/Feed';
import Sidebar from './components/Navigation/Sidebar';
import CreateIdeaPage from './components/CreateIdeaPage/CreateIdeaPage';
import IdeaShowPage from './components/IdeaShowPage/IdeaShowPage';
import UserShow from './components/UserShow/UserShow';
import ErrorPage from './components/NotFound/ErrorPage';
import Footer from './components/Footer/Footer';
import React from 'react';
import AboutModal from '../src/components/AboutModal/AboutModal';
import LoginModal from '../src/components/Auth/LoginModal';
import SignUpModal from '../src/components/Auth/SignUpModal';
import IncompleteModal from '../src/components/IncompleteModal/IncompleteModal';


export const AboutModalContext = React.createContext();
export const LoginModalContext = React.createContext();
export const IncompleteModalContext = React.createContext();

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showIncompleteModal, setShowIncompleteModal] = useState(false);


  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);

  return (
    loaded && (
      <>
      <IncompleteModalContext.Provider value={{ showIncompleteModal, setShowIncompleteModal }}>
          <LoginModalContext.Provider value={{ showLoginModal, setShowLoginModal, showSignUpModal, setShowSignUpModal }}>
            <AboutModalContext.Provider value={{ showAboutModal, setShowAboutModal }}>
              <Sidebar
                open={open} setOpen={setOpen} />
              <div className={open ? "padding-containerOpen" : "padding-containerClosed"}>
                <Switch>
                  <Route exact path='/feed' component={FeedPage} />
                  <ProtectedRoute exact path='/ideas/new' component={CreateIdeaPage} />
                  <Route exact path='/idea/:ideaId' component={IdeaShowPage} />
                  <Route exact path='/users/:userId/ideas' component={UserShow} />
                  <Route exact path='/' component={Splash} />
                </Switch>

                <AboutModal />
                <LoginModal />
                <SignUpModal />
                <IncompleteModal />

                <Footer />
              </div>
            </AboutModalContext.Provider>
          </LoginModalContext.Provider>
      </IncompleteModalContext.Provider>
      </>
    )
  );
}

export default App;

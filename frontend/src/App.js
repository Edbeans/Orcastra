import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { AuthRoute, ProtectedRoute } from "./components/Routes/Routes";
import { NavLink, Switch } from "react-router-dom";
import LoginSignUpPage from './components/Auth/LoginSignUpPage'
import { getCurrentUser } from './store/session';
import FeedPage from './components/Feed/FeedPage';
import Sidebar from './components/Navigation/Sidebar';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);

  return (
    loaded && (
      <>
      <Sidebar/>
        <Switch>
          <ProtectedRoute exact path='/' component={FeedPage} />
          <AuthRoute exact path='/' component={LoginSignUpPage} />
          <AuthRoute exact path='/login' component={LoginSignUpPage} />
          <AuthRoute exact path='/signup' component={LoginSignUpPage} />
        </Switch>
      </>
    )
  );
}

export default App;

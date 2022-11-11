import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import Navigation from './screens/Navigation';
import { useDispatch, useSelector } from 'react-redux';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import VideoPage from './screens/VideoPage';
import Account from './screens/Account';
import { useEffect } from 'react';
import { setCurrentUser } from './utils/firebase';
import { setUser } from './utils/userReducer';

function App() {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    const userChange = async () => {
      await setCurrentUser((currentUser) => dispatch(setUser(currentUser)))
    }
    userChange()
  }, [user?.uid])

  return (
    <div className="App">
      <Router>
        <Routes>
          {!user ? (
            <>
              <Route exact path='/' element={<SignIn />} />
              <Route path='/signup' element={<SignUp />} />
            </>  
          ) : (
            <Route exact path='/' element={<Navigation />}>
              <Route index element={<HomeScreen />} />
              <Route path='video/:slug' element={<VideoPage />} />
              <Route path='account' element={<Account />} />
            </Route>)
          }
        </Routes>
      </Router>
    </div>
  );
}

export default App;

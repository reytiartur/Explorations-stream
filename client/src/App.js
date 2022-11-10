import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import Navigation from './screens/Navigation';
import { useSelector } from 'react-redux';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import VideoPage from './screens/VideoPage';
import Account from './screens/Account';

function App() {
  const user = useSelector((state) => state.user)

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

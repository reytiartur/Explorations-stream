import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import Navigation from './screens/Navigation';
import { useSelector } from 'react-redux';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';

function App() {
  const user = useSelector((state) => state.user)

  return (
    <div className="App h-screen">
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
            </Route>)
          }
        </Routes>
      </Router>
    </div>
  );
}

export default App;

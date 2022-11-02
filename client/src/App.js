import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import Navigation from './screens/Navigation';

function App() {
  return (
    <div className="App h-screen">
      <Router>
        <Routes>
          <Route exact path='/' element={<Navigation />}>
            <Route index element={<HomeScreen />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

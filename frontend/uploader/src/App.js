import './App.css';
import HomePage from './components/home/homePage';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Dashboard from './components/dashboard/dashboard';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route exact path='/' element={<HomePage />} />
      <Route path='/dashboard' element={<Dashboard />} />
    </Routes>
    </BrowserRouter>
    
  );
}

export default App;

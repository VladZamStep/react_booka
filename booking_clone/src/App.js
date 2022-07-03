import { Routes, Route, BrowserRouter } from 'react-router-dom';
import HomePage from './pages/home_page/HomePage';
import HotelPage from './pages/hotel_page/HotelPage';
import ListPage from './pages/list_page/ListPage';
import LoginPage from './pages/login_page/LoginPage';
import './app.css';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/hotels' element={<ListPage />} />
        <Route path='/hotels/:id' element={<HotelPage />} />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;

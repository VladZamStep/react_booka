import { useContext } from 'react';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import { AuthContext } from './components/context/AuthContext';
import { DarkModeContext } from './components/context/darkModeContext';
import { hotelColumns, roomColumns, userColumns } from './datatablesource';
import { hotelInputs, userInputs } from './formSource';
import HomePage from './pages/homePage/HomePage';
import ListPage from './pages/listPage/ListPage';
import LoginPage from './pages/loginPage/LoginPage';
import NewHotel from './pages/newPages/NewHotel';
import NewRoom from './pages/newPages/NewRoom';
import NewUser from './pages/newPages/NewUser';
import SinglePage from './pages/singlePage/SinglePage';
import './style/dark.scss'

const App = () => {

  const { darkMode } = useContext(DarkModeContext)

  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    if (!user) {
      return <Navigate to="login" />
    }
    return children;
  }

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path='/'>
            <Route path='/login' element={<LoginPage />} />
            <Route index element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>} />
            <Route path='users'>
              <Route index element={
                <ProtectedRoute>
                  <ListPage columns={userColumns} />
                </ProtectedRoute>
              } />
              <Route path=':userId' element={
                <ProtectedRoute>
                  <SinglePage />
                </ProtectedRoute>
              } />
              <Route path='new' element={
                <ProtectedRoute>
                  <NewUser inputs={userInputs} title="Add New User" />
                </ProtectedRoute>
              } />
            </Route>
            <Route path='hotels'>
              <Route index element={
                <ProtectedRoute>
                  <ListPage columns={hotelColumns} />
                </ProtectedRoute>
              } />
              <Route path=':hotelId' element={
                <ProtectedRoute>
                  <SinglePage />
                </ProtectedRoute>
              } />
              <Route path='new' element={
                <ProtectedRoute>
                  <NewHotel />
                </ProtectedRoute>
              } />
            </Route>
            <Route path='rooms'>
              <Route index element={
                <ProtectedRoute>
                  <ListPage columns={roomColumns} />
                </ProtectedRoute>
              } />
              <Route path=':roomId' element={
                <ProtectedRoute>
                  <SinglePage />
                </ProtectedRoute>
              } />
              <Route path='new' element={
                <ProtectedRoute>
                  <NewRoom />
                </ProtectedRoute>
              } />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;

import './app.scss';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SignupPage from './pages/signup-page/SignupPage.component';
import DashboardPage from './pages/dashboard-page/DashboardPage.component';
import LandingPage from './pages/landing-page/LandingPage.component';
import HomePage from './pages/home-page/HomePage.component';
import LoginPage from './pages/login-page/LoginPage.component';
import PrivateRoute from './features/auth/components/PrivateRoute';
import Header from './components/header/Header';
import { useEffect } from 'react';
import { useAppSelector } from './hooks/redux/hooks';
import {
  ToastNotification
} from '@carbon/react';
import AboutPageComponent from './pages/about-page/About.component';
import "@carbon/styles/css/styles.css";
import "@carbon/charts/styles.css";
import { toast, ToastContainer } from 'react-toastify';

function App() {

  const { showAlert, alertMsg } = useAppSelector((state) => state.food);
  const { showAuthAlert, alertAuthMsg } = useAppSelector((state) => state.auth);



  useEffect(() => {
    if (showAuthAlert && alertAuthMsg) {
      toast(alertAuthMsg);
    }
  }, [showAuthAlert, alertAuthMsg]);

  return (
    <div>
      <BrowserRouter>
        <Header />
        {!!showAlert && (
            <ToastNotification
              className="toast"
              role="status"
              id="toast"
              timeout={2000}
              title={alertMsg}
              subtitle=""
            />
        )}
        <ToastContainer />
        <Routes>
          <Route path='/' element={<HomePage />}></Route>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/search' element={
            <PrivateRoute page={<LandingPage />} />
          } />
          <Route path='/dashboard' element={
            <PrivateRoute page={<DashboardPage />} />
          } />
          <Route path='/about' element={<AboutPageComponent />} />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

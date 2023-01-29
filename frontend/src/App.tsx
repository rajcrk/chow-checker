import './app.scss';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SignupPage from './pages/signup-page/SignupPage.component';
import DashboardPage from './pages/dashboard-page/DashboardPage.component';
import LandingPage from './pages/landing-page/LandingPage.component';
import HomePage from './pages/home-page/HomePage.component';
import LoginPage from './pages/login-page/LoginPage.component';
import PrivateRoute from './features/auth/components/PrivateRoute';
import Header from './components/header/Header';
import { ToastContainer, toast } from 'react-toastify';
import { useEffect } from 'react';
import { useAppSelector } from './hooks/redux/hooks';
import AboutPageComponent from './pages/about-page/About.component';
import "@carbon/styles/css/styles.css";
import "@carbon/charts/styles.css";

function App() {

  const { showAlert, alertMsg } = useAppSelector((state) => state.food);

  useEffect(() => {
    if (showAlert && alertMsg) {
      toast(alertMsg);
    }
  }, [showAlert, alertMsg]);

  return (
    <div>
      <BrowserRouter>
        <Header />
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

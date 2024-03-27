import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppProvider } from './AppContext'; // Import the AppProvider
import Home from './pages/home';
import Navbar from './components/navbar';
import Footer from './components/footer';
import Login from './pages/login';
import SessionPage from './pages/sessionpage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppProvider> {/* Wrap your entire app with the AppProvider */}
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/session/:sessionid' element={<SessionPage />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </AppProvider>
  </React.StrictMode>
);

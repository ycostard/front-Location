import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import NavBar from './components/NavBar';
import ListProduits from './components/annonce/ListProduits';
import Profile from './components/Profile';
import AuthPage from './components/auth/AuthPage';
import PrivateRoute from './components/PrivateRoute'; // Assurez-vous du chemin correct

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex">
          <div className="w-1/6"></div>
          <div className="w-4/6 px-4">
            <NavBar />
            <div className='mx-2'>
              <Routes>
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/profil" element={<PrivateRoute element={<Profile />} />} />
                <Route path="/" element={<ListProduits />} />
              </Routes>
            </div>
          </div>
          <div className="w-1/6"></div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

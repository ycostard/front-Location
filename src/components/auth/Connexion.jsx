import React, { useState } from 'react';
import { useAuth } from '../../AuthContext';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function Connexion() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ mail: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { mail, password } = formData;
    if (!mail || !password) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Tous les champs doivent être remplis.',
      });
      return;
    }

    // Simulation de la connexion
    login(); // Connexion réussie
    Swal.fire({
      icon: 'success',
      title: 'Connexion réussie',
      text: 'Vous êtes maintenant connecté !',
      confirmButtonColor: '#3085d6',
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/profil');
      }
    })
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Connexion</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Email</label>
          <input
            type="email"
            name="mail"
            value={formData.mail}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Mot de passe</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="btn btn-primary bg-blue-500 rounded-md p-2 text-white"
          >
            Se connecter
          </button>
        </div>
      </form>
    </div>
  );
}

export default Connexion;

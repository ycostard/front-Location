import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

function Inscription() {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    mail: '',
    password: '',
    pays: '',
    ville: '',
    rue: '',
    cp: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { nom, prenom, mail, password, pays, ville, rue, cp } = formData;
    if (!nom || !prenom || !mail || !password || !pays || !ville || !rue || !cp) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Tous les champs doivent être remplis.',
      });
      return;
    }

    axios.post('http://localhost:3001/auth/register', formData)
      .then(res => {
        if (res.data.error) {
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: res.data.error,
          });
          return;
        }
        Swal.fire({
          icon: 'success',
          title: 'Inscription réussie',
          text: 'Vous êtes maintenant inscrit !',
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
        setFormData({
          nom: '',
          prenom: '',
          mail: '',
          password: '',
          pays: '',
          ville: '',
          rue: '',
          cp: ''
        });
      })
      .catch(err => {
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Une erreur est survenue, veuillez réessayer.',
        });
      });
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Inscription</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Nom</label>
          <input
            type="text"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Prénom</label>
          <input
            type="text"
            name="prenom"
            value={formData.prenom}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
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
        <div className="mb-4">
          <label className="block mb-2">Pays</label>
          <input
            type="text"
            name="pays"
            value={formData.pays}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Ville</label>
          <input
            type="text"
            name="ville"
            value={formData.ville}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Rue</label>
          <input
            type="text"
            name="rue"
            value={formData.rue}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Code Postal</label>
          <input
            type="text"
            name="cp"
            value={formData.cp}
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
            S'inscrire
          </button>
        </div>
      </form>
    </div>
  );
}

export default Inscription;
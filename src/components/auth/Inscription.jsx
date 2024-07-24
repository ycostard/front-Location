import React, { useState } from 'react';
import Swal from 'sweetalert2';

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

    console.log('Form Data Submitted:', formData);

    Swal.fire({
      icon: 'success',
      title: 'Inscription réussie',
      text: 'Vous êtes maintenant inscrit !',
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
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Inscription</h2>
      <form onSubmit={handleSubmit}>
        
      </form>
    </div>
  );
}

export default Inscription;

import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext'; // Assurez-vous que le chemin est correct
import moment from 'moment';
import 'moment/locale/fr'; // Importer la locale française

moment.locale('fr');

function Produit({ annonce }) {
  const [isBooking, setIsBooking] = useState(false); // État pour la réservation
  const [error, setError] = useState(null); // État pour les messages d'erreur
  const [success, setSuccess] = useState(null); // État pour les messages de succès
  const { isAuthenticated } = useAuth(); // Vérifier si l'utilisateur est authentifié
  const navigate = useNavigate(); // Hook pour la redirection

  const handleBooking = () => {
    if (!isAuthenticated) {
      Swal.fire({
        title: 'Vous devez être connecté pour réserver.',
        icon: 'info',
        confirmButtonText: 'OK',
      }).then(() => navigate('/auth'));
      return;
    }

    setIsBooking(true);
    
    const token = localStorage.getItem('token');

    Swal.fire({
      title: 'Êtes-vous sûr de vouloir réserver ?',
      showCancelButton: true,
      icon: 'info',
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non',
    }).then((result) => {
      if (result.isConfirmed) {
        axios.post('http://localhost:3001/api/reservations', {
          id_annonce: annonce.id,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(res => {
          setSuccess('Réservation effectuée avec succès!');
          setError(null);
        })
        .catch(err => {
          setError('Erreur lors de la réservation.');
          setSuccess(null);
        })
        .finally(() => {
          setIsBooking(false);
        });
      } else {
        setIsBooking(false);
      }
    });
  };

  const imageUrl = `http://localhost:3001/api/images/${annonce.vehicule.photo}`;
  const timeSincePosted = moment(annonce.date_creation).fromNow();

  return (
    <div className="card card-compact w-full bg-base-100 shadow-xl rounded-2xl pb-3">
      <div className="card-body">
        <figure className='relative'>
          <img
            src={imageUrl}
            alt="voiture"
            className="w-full h-40 object-cover rounded-t-2xl"
          />
        </figure>
        <div className="mx-3">
          <p className="my-2">{annonce.ville}, {annonce.rue}</p>
          <p className="my-2">{annonce.CP} - {annonce.pays}</p>
          <p className="my-2">Prix: {annonce.prix}€/jour</p>
          <p className="my-2">Dates: {new Date(annonce.date_debut).toLocaleDateString()} - {new Date(annonce.date_fin).toLocaleDateString()}</p>
          <p className="my-2">Mise en ligne par : {annonce.vehicule.utilisateur.prenom} {annonce.vehicule.utilisateur.nom}</p>
          <p className='my-2'>Mise en ligne il y a : {timeSincePosted}</p>
          <div className="flex flex-col space-y-2 items-center justify-end">
            <button
              onClick={handleBooking}
              className="btn btn-primary p-1 bg-blue-700 rounded-md text-white"
              disabled={isBooking} // Désactiver le bouton pendant la réservation
            >
              {isBooking ? 'Réservation en cours...' : 'Réserver'}
            </button>
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Produit;
import React from 'react';
import VoitureImg from '../../assets/voiture.jpg'; // Vous pouvez utiliser une image par défaut ou une image spécifique à l'annonce

function Produit({ annonce }) {
  return (
    <div className="card card-compact w-full bg-base-100 shadow-xl rounded-2xl pb-3">
      <div className="card-body">
        <figure>
          <img
            src={VoitureImg} // Vous pouvez utiliser annonce.image si vous avez une URL d'image pour chaque annonce
            alt="voiture"
            width={384}
            height={140}
            className="rounded-t-2xl"
          />
        </figure>
        <div className="mx-3">
          <p className="my-2">{annonce.ville}, {annonce.rue}</p> 
          <p className="my-2">{annonce.CP} - {annonce.pays}</p>
          <p className="my-2">Prix: {annonce.prix}€/jour</p>
          <p className="my-2">Dates: {new Date(annonce.date_debut).toLocaleDateString()} - {new Date(annonce.date_fin).toLocaleDateString()}</p>
          <div className="flex space-x-2 items-center justify-end">
            <button
              className="btn btn-primary p-1 bg-blue-700 rounded-md text-white"
            >
              Réserver
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Produit;
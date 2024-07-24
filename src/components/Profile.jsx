import { useState } from 'react';
import Swal from 'sweetalert2';
import VoitureImg from '../assets/voiture.jpg';

function Profile() {
  const [userName] = useState('John Doe'); // Remplacez par le nom de l'utilisateur
  const [activeTab, setActiveTab] = useState('vehicles'); // Onglet actif
  const [vehicles, setVehicles] = useState([
    { id: 1, marque: 'Peugeot', modele: '208', couleur: 'Rouge', kilometrage: 12000, carburant: 'Essence', image: VoitureImg },
    { id: 2, marque: 'Renault', modele: 'Clio', couleur: 'Bleu', kilometrage: 8500, carburant: 'Diesel', image: VoitureImg },
    { id: 3, marque: 'Citroën', modele: 'C3', couleur: 'Blanc', kilometrage: 15000, carburant: 'Essence', image: VoitureImg },
  ]);
  const [showPopup, setShowPopup] = useState(false);
  const [newVehicle, setNewVehicle] = useState({
    marque: '',
    modele: '',
    couleur: '',
    kilometrage: '',
    carburant: '',
    image: '',
  });

  const handleDeleteVehicle = (id) => {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: "Vous ne pourrez pas revenir en arrière !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimez-le !',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        setVehicles(vehicles.filter(vehicle => vehicle.id !== id));
        Swal.fire(
          'Supprimé !',
          'Le véhicule a été supprimé.',
          'success'
        )
      }
    })
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVehicle({ ...newVehicle, [name]: value });
  };

  const handleAddVehicle = () => {
    const newId = vehicles.length ? vehicles[vehicles.length - 1].id + 1 : 1;
    const vehicle = { id: newId, ...newVehicle, image: newVehicle.image || VoitureImg };
    setVehicles([...vehicles, vehicle]);
    setNewVehicle({
      marque: '',
      modele: '',
      couleur: '',
      kilometrage: '',
      carburant: '',
      image: '',
    });
    setShowPopup(false);
  };

  return (
    <div className='p-6'>
      <h2 className="text-2xl font-semibold mb-4">Hello, {userName}</h2>
      <p className="mb-4">Bienvenue sur votre espace personnel. Vous pouvez consulter et gérer vos informations ici.</p>
      
      {/* Onglets */}
      <div className="flex border-b mb-4">
        <button
          className={`py-2 px-4 ${activeTab === 'vehicles' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
          onClick={() => setActiveTab('vehicles')}
        >
          Vos véhicules
        </button>
        <button
          className={`py-2 px-4 ${activeTab === 'annonces' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
          onClick={() => setActiveTab('annonces')}
        >
          Vos annonces
        </button>
        <button
          className={`py-2 px-4 ${activeTab === 'reservations' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
          onClick={() => setActiveTab('reservations')}
        >
          Vos réservations
        </button>
      </div>

      {/* Contenu des onglets */}
      {activeTab === 'vehicles' && (
        <div className="flex flex-col mb-4">
          <div className='flex items-center justify-between mb-2'>
              <h3 className="text-xl mb-2">Vos véhicules</h3>
              <button className="btn btn-primary bg-blue-500 rounded-md p-2 text-white" onClick={() => setShowPopup(true)}>
                  Ajouter un véhicule
              </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {vehicles.map(vehicle => (
              <div key={vehicle.id} className="card card-compact w-full bg-base-100 shadow-xl rounded-2xl pb-3">
                <div className="card-body">
                  <figure>
                    <img
                      src={vehicle.image}
                      alt={vehicle.modele}
                      width={384}
                      height={140}
                      className="rounded-t-2xl"
                    />
                  </figure>
                  <div className="mx-3">
                    <p className="my-2">{vehicle.marque} {vehicle.modele} {vehicle.couleur}</p>
                    <p className="my-2">{vehicle.kilometrage} km - {vehicle.carburant}</p>
                    <div className="flex space-x-2 items-center justify-end">
                      <button
                        onClick={() => handleDeleteVehicle(vehicle.id)}
                        className="btn btn-primary p-1 bg-red-700 rounded-md text-white"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'annonces' && (
        <div className="">
          <div className='flex items-center justify-between mb-2'>
              <h3 className="text-xl mb-2">Vos annonces</h3>
              <button className="btn btn-primary bg-blue-500 rounded-md p-2 text-white">
                  Ajouter une annonce
              </button>
          </div>
          <p>Aucune annonce à afficher pour le moment.</p>
        </div>
      )}

      {activeTab === 'reservations' && (
        <div className="">
          <div className='flex items-center justify-between mb-2'>
              <h3 className="text-xl mb-2">Vos réservations</h3>
          </div>
          <p>Aucune réservation à afficher pour le moment.</p>
        </div>
      )}

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Ajouter un nouveau véhicule</h2>
              <button onClick={() => setShowPopup(false)} className="text-gray-500 hover:text-gray-800">
                &times;
              </button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); handleAddVehicle(); }}>
              <div className="mb-4">
                <label className="block mb-2">Marque</label>
                <input
                  type="text"
                  name="marque"
                  value={newVehicle.marque}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Modèle</label>
                <input
                  type="text"
                  name="modele"
                  value={newVehicle.modele}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Couleur</label>
                <input
                  type="text"
                  name="couleur"
                  value={newVehicle.couleur}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Kilométrage</label>
                <input
                  type="number"
                  name="kilometrage"
                  value={newVehicle.kilometrage}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Carburant</label>
                <input
                  type="text"
                  name="carburant"
                  value={newVehicle.carburant}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Image (URL)</label>
                <input
                  type="text"
                  name="image"
                  value={newVehicle.image}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="btn btn-primary bg-blue-500 rounded-md p-2 text-white"
                >
                  Ajouter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;

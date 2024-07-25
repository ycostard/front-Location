import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

function Profile() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [userName, setUsername] = useState("--- ---"); // Remplacez par le nom de l'utilisateur
  const [activeTab, setActiveTab] = useState("vehicules"); // Onglet actif
  const [vehicules, setVehicules] = useState([]);
  const [annonces, setAnnonces] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showAnnoncePopup, setShowAnnoncePopup] = useState(false);
  const [newVehicule, setNewVehicule] = useState({
    marque: "",
    modele: "",
    couleur: "",
    kilometrage: "",
    carburant: "",
    image: "",
  });
  const [newAnnonce, setNewAnnonce] = useState({
    id_vehicule: "",
    pays: "",
    ville: "",
    rue: "",
    cp: "",
    date_debut: "",
    date_fin: "",
    prix: "",
  });
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
    }
};

  useEffect(() => {
    setUsername(
      JSON.parse(localStorage.getItem("user")).prenom +
        " " +
        JSON.parse(localStorage.getItem("user")).nom
    );
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:3001/api/vehicules", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setVehicules(res.data.vehicule);
      });

    axios
      .get("http://localhost:3001/api/annoncesByToken", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setAnnonces(res.data.annonces);
      });
  }, []);

  const handleDeleteVehicle = (id) => {
    Swal.fire({
      title: "Êtes-vous sûr ?",
      text: "Vous ne pourrez pas revenir en arrière !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, supprimez-le !",
      cancelButtonText: "Annuler",
    }).then((result) => {
      if (result.isConfirmed) {
        const token = localStorage.getItem("token");

        axios
          .delete(`http://localhost:3001/api/vehicules/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            setVehicules(vehicules.filter((vehicle) => vehicle.id !== id));
            Swal.fire("Supprimé !", "Le véhicule a été supprimé.", "success");
          });
      }
    });
  };

  const handleDeleteAnnonce = (id) => {
    Swal.fire({
      title: "Êtes-vous sûr ?",
      text: "Vous ne pourrez pas revenir en arrière !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, supprimez-le !",
      cancelButtonText: "Annuler",
    }).then((result) => {
      if (result.isConfirmed) {
        const token = localStorage.getItem("token");

        axios
          .delete(`http://localhost:3001/api/annonces/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            setAnnonces(annonces.filter((annonce) => annonce.id !== id));
            Swal.fire("Supprimé !", "L'annonce a été supprimée.", "success");
          });
      }
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVehicule({ ...newVehicule, [name]: value });
  };

  const handleAnnonceInputChange = (e) => {
    const { name, value } = e.target;
    setNewAnnonce({ ...newAnnonce, [name]: value });
  };

  const handleAddVehicle = () => {
    const newId = vehicules.length ? vehicules[vehicules.length - 1].id + 1 : 1;
     // Créez une instance de FormData
    const formData = new FormData();
    formData.append("marque", newVehicule.marque);
    formData.append("modele", newVehicule.modele);
    formData.append("couleur", newVehicule.couleur);
    formData.append("kilometrage", newVehicule.kilometrage);
    formData.append("carburant", newVehicule.carburant);
    if (file) {
      formData.append("photo", file);
    }

    const token = localStorage.getItem("token");

    axios
      .post("http://localhost:3001/api/vehicules", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res)
        setVehicules([...vehicules, { ...newVehicule, id: newId, photo: res.data.photo }]);
        Swal.fire("Ajouté !", "Le véhicule a été ajouté.", "success");
      });

    setNewVehicule({
      marque: "",
      modele: "",
      couleur: "",
      kilometrage: "",
      carburant: "",
      image: "",
    });
    setShowPopup(false);
  };

  const handleAddAnnonce = () => {
    const token = localStorage.getItem("token");

    axios
      .post("http://localhost:3001/api/annonces", newAnnonce, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setAnnonces([...annonces, newAnnonce]);
        Swal.fire("Ajouté !", "L'annonce a été ajoutée.", "success");
      });

    setNewAnnonce({
      id_vehicule: "",
      pays: "",
      ville: "",
      rue: "",
      cp: "",
      date_debut: "",
      date_fin: "",
      prix: "",
    });
    setShowAnnoncePopup(false);
  };

  const handleDeconnexion = () => {
    localStorage.clear();
    logout();
    navigate("/");
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold mb-4">Hello, {userName}</h2>
        <button
          className="btn btn-primary bg-blue-500 rounded-md p-2 text-white"
          onClick={handleDeconnexion}
        >
          Déconnexion
        </button>
      </div>
      <p className="mb-4">
        Bienvenue sur votre espace personnel. Vous pouvez consulter et gérer vos
        informations ici.
      </p>

      {/* Onglets */}
      <div className="flex border-b mb-4">
        <button
          className={`py-2 px-4 ${
            activeTab === "vehicules"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("vehicules")}
        >
          Vos véhicules
        </button>
        <button
          className={`py-2 px-4 ${
            activeTab === "annonces"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("annonces")}
        >
          Vos annonces
        </button>
        <button
          className={`py-2 px-4 ${
            activeTab === "reservations"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("reservations")}
        >
          Vos réservations
        </button>
      </div>

      {/* Contenu des onglets */}
      {activeTab === "vehicules" && (
        <div className="flex flex-col mb-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl mb-2">Vos véhicules</h3>
            <button
              className="btn btn-primary bg-blue-500 rounded-md p-2 text-white"
              onClick={() => setShowPopup(true)}
            >
              Ajouter un véhicule
            </button>
            
          </div>
          {vehicules.length === 0 ? (
            <p>Aucun véhicule à afficher pour le moment.</p>
          ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {vehicules.map((vehicle) => (
              <div
                key={vehicle.id}
                className="card card-compact w-full bg-base-100 shadow-xl rounded-2xl pb-3"
              >
                <div className="card-body">
                  <figure className="relative">
                    <img
                      src={"http://localhost:3001/api/images/" + vehicle.photo}
                      alt={vehicle.modele}
                      className="w-full h-40 object-cover rounded-t-2xl"
                    />
                  </figure>
                  <div className="mx-3">
                    <p className="my-2">
                      {vehicle.marque} {vehicle.modele} {vehicle.couleur}
                    </p>
                    <p className="my-2">
                      {vehicle.kilometrage} km - {vehicle.carburant}
                    </p>
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
          )}
        </div>
      )}

      {activeTab === "annonces" && (
        <div className="">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl mb-2">Vos annonces</h3>
            <button
              className="btn btn-primary bg-blue-500 rounded-md p-2 text-white"
              onClick={() => setShowAnnoncePopup(true)}
            >
              Ajouter une annonce
            </button>
          </div>
          {annonces.length === 0 ? (
            <p>Aucune annonce à afficher pour le moment.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {annonces.map((annonce, index) => (
                <div
                  key={index}
                  className="card card-compact w-full bg-base-100 shadow-xl rounded-2xl pb-3"
                >
                  <div className="card-body">
                    <p>
                      {annonce.pays} - {annonce.ville} - {annonce.rue}
                    </p>
                    <p>CP: {annonce.CP}</p>
                    <p>
                      Début: {new Date(annonce.date_debut).toLocaleDateString()}
                    </p>
                    <p>
                      Fin: {new Date(annonce.date_fin).toLocaleDateString()}
                    </p>
                    <p>Prix: {annonce.prix} €</p>
                      <button className="btn btn-primary p-1 bg-red-700 rounded-md text-white" onClick={() => handleDeleteAnnonce(annonce.id)}>
                        Supprimer
                      </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "reservations" && (
        <div className="">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl mb-2">Vos réservations</h3>
            <button
              className="btn btn-primary bg-blue-500 rounded-md p-2 text-white"
              onClick={() => navigate("/")}
            >
              Réserver une voiture
            </button>
          </div>
          <p>Aucune réservation à afficher pour le moment.</p>
        </div>
      )}

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                Ajouter un nouveau véhicule
              </h2>
              <button
                onClick={() => setShowPopup(false)}
                className="text-gray-500 hover:text-gray-800"
              >
                &times;
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddVehicle();
              }}
            >
              <div className="mb-4">
                <label className="block mb-2">Marque</label>
                <input
                  type="text"
                  name="marque"
                  value={newVehicule.marque}
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
                  value={newVehicule.modele}
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
                  value={newVehicule.couleur}
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
                  value={newVehicule.kilometrage}
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
                  value={newVehicule.carburant}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Image (URL)</label>
                <input
                  type="file"
                  name="image"
                  onChange={handleFileChange} // Ajoutez un gestionnaire de changement pour les fichiers
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

      {showAnnoncePopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                Ajouter une nouvelle annonce
              </h2>
              <button
                onClick={() => setShowAnnoncePopup(false)}
                className="text-gray-500 hover:text-gray-800"
              >
                &times;
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddAnnonce();
              }}
            >
              <div className="mb-4">
                <label className="block mb-2">Véhicule ID</label>
                <select
                  name="id_vehicule"
                  value={newAnnonce.id_vehicule}
                  onChange={handleAnnonceInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                >
                  <option value="">Sélectionnez un véhicule</option>
                  {vehicules.map((vehicule) => (
                    <option key={vehicule.id} value={vehicule.id}>
                      {vehicule.marque} {vehicule.modele} ({vehicule.couleur})
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block mb-2">Pays</label>
                <input
                  type="text"
                  name="pays"
                  value={newAnnonce.pays}
                  onChange={handleAnnonceInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Ville</label>
                <input
                  type="text"
                  name="ville"
                  value={newAnnonce.ville}
                  onChange={handleAnnonceInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Rue</label>
                <input
                  type="text"
                  name="rue"
                  value={newAnnonce.rue}
                  onChange={handleAnnonceInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Code postal</label>
                <input
                  type="text"
                  name="cp"
                  value={newAnnonce.cp}
                  onChange={handleAnnonceInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Date de début</label>
                <input
                  type="date"
                  name="date_debut"
                  value={newAnnonce.date_debut}
                  onChange={handleAnnonceInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Date de fin</label>
                <input
                  type="date"
                  name="date_fin"
                  value={newAnnonce.date_fin}
                  onChange={handleAnnonceInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Prix</label>
                <input
                  type="number"
                  name="prix"
                  value={newAnnonce.prix}
                  onChange={handleAnnonceInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
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

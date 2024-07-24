import { useState } from "react";
import VoitureImg from '../../assets/voiture.jpg'

function Produit() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="card card-compact w-full bg-base-100 shadow-xl rounded-2xl pb-3">
        <div className="card-body">
          <figure>
            <img
              src={VoitureImg}
              alt="voiture"
              width={384}
              height={140}
              className="rounded-t-2xl"
            />
          </figure>
          <div className="mx-3">
                  <p className="my-2">Renault Twingo Rouge</p> 
                  <p className="my-2">188900 km - Essence</p>
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
    </>
  );
}

export default Produit;

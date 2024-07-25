import React from 'react';
import Connexion from './Connexion';
import Inscription from './Inscription'; 

function AuthPage() {
  const [isLogin, setIsLogin] = React.useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className='card card-compact w-1/2 mx-auto shadow-xl my-4 p-2 rounded-md'>
      {isLogin ? <Connexion /> : <Inscription />}
      <button onClick={toggleForm} className="mt-4 text-blue-500">
        {isLogin ? "Pas encore de compte ? Inscrivez-vous" : "Déjà un compte ? Connectez-vous"}
      </button>
    </div>
  );
}

export default AuthPage;

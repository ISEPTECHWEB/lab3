import React from 'react';
import Actors from './Actors';

//Composant stateless ActorPage
const ActorPage = () => (
  <div>
    <Actors/>
  </div>
);
//Pour l'instant on n'affiche que les Acteurs et le formulaire via le composant Acteurs
//Mais avec ActorPage la page est plus modulable et évolutive => ajout d'infos différentes

export default ActorPage;
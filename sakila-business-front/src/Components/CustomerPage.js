import React from 'react';
import Customers from './Customers';

//Composant stateless CustomerPage
const CustomerPage = () => (
  <div>
    <Customers/>
  </div>
);
//Pour l'instant on n'affiche que les Clients et le formulaire via le composant Clients
//Mais avec CustomerPage la page est plus modulable et évolutive => ajout d'infos différentes

export default CustomerPage;

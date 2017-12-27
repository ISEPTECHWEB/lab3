import axios from 'axios';

    //Constante actorHelper contenant les requêtes axios utilisées par le composant Acteurs
    const actorHelper = {

        //Suppression
        deleteRequest: (id) => 
        {
            return axios.get('http://localhost:8080/actorDelete/'+ id);
        },

        //Mise à jour
        updateRequest: (id, firstName, lastName) => 
        {
            return axios.post('http://localhost:8080/actorUpdate/',
            {   actorId: id,
                firstName: firstName,
                lastName: lastName })
        },

        //Création
        createRequest: (firstName, lastName) => 
        {
            return axios.post('http://localhost:8080/actor/',
            {
                firstName: firstName,
                lastName: lastName
            }
            )
        },

        //Chargement
        loadRequest: () =>{
            return axios.get('http://localhost:8080/actor/');
        } 

    };

    export {actorHelper};
import axios from 'axios';

    //Constante choiceHelper contenant les méthodes principales utilisée pour modifier les listes de choix
    const actorHelper = {

        //Ajout d'un choix à la liste
        deleteRequest: (id) => 
        {
            return axios.get('http://localhost:8080/actorDelete/'+ id);
        },


        updateRequest: (id, firstName, lastName) => 
        {
            return axios.post('http://localhost:8080/actorUpdate/',
            {   actorId: id,
                firstName: firstName,
                lastName: lastName })
        },


        createRequest: (firstName, lastName) => 
        {
            return axios.post('http://localhost:8080/actor/',
            {
                firstName: firstName,
                lastName: lastName
            }
            )
        },

        
        loadRequest: () =>{
            return axios.get('http://localhost:8080/actor/');
        } 

    };

    export {actorHelper};
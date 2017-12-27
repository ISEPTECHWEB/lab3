import axios from 'axios';

    //Constante customerHelper contenant les requêtes axios et les méthodes principales utilisées par le composant Client
    const customerHelper = {

        //Suppression
        deleteRequest: (id) => 
        {
            return axios.get('http://localhost:8080/customerDelete/'+ id);
        },

        //Mise à jour
        updateRequest: (id, firstName, lastName, address) => 
        {
            return axios.post('http://localhost:8080/customerUpdate/',
            {   customerId: id,
                firstName: firstName,
                lastName: lastName,
                address: address 
            })
        },

        //Création
        createRequest: (firstName, lastName, address) => 
        {
            return axios.post('http://localhost:8080/customer/',
            {
                firstName: firstName,
                lastName: lastName,
                address: address
            })
        },

        //Chargement
        loadRequest: () =>{
            return axios.get('http://localhost:8080/customer/');
        },
        
        //Création de l'objet adresse tel qu'il doit être envoyé dans les requête axios
        createAddressObject: (address, district, city, postalCode, country, phone) => {
            var addressObject = {
                            address: address,
                            address2:"",
                            city:{
                                    city: city,
                                    country:{
                                                country: country, 
                                                lastUpdate: (new Date()).getTime()
                                            },
                                    lastUpdate:(new Date()).getTime()
                                },
                            district: district,
                            lastUpdate: (new Date()).getTime(),
                            phone: phone,
                            postalCode: postalCode
                        }
            return addressObject;
        }

    };

    export {customerHelper};
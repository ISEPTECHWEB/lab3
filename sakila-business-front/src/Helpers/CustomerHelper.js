import axios from 'axios';

    //Constante choiceHelper contenant les méthodes principales utilisée pour modifier les listes de choix
    const customerHelper = {

        //Ajout d'un choix à la liste
        deleteRequest: (id) => 
        {
            return axios.get('http://localhost:8080/customerDelete/'+ id);
        },


        updateRequest: (id, firstName, lastName, address) => 
        {
            return axios.post('http://localhost:8080/customerUpdate/',
            {   customerId: id,
                firstName: firstName,
                lastName: lastName,
                address: address 
            })
        },


        createRequest: (firstName, lastName, address) => 
        {
            return axios.post('http://localhost:8080/customer/',
            {
                firstName: firstName,
                lastName: lastName,
                address: address
            })
        },

        
        loadRequest: () =>{
            return axios.get('http://localhost:8080/customer/');
        },
        
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
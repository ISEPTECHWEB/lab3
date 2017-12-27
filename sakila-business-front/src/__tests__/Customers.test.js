import React from 'react';
import ReactDOM from 'react-dom';
import {customerHelper} from '../Helpers/CustomerHelper';
import axios from 'axios';

//Test de la création de l'objet adresse
it('create an address object with the address fields', () => {

    //Définition des éléments de l'adresse
    var address = "28 rue Notre Dame des Champs";
    var district = "6e arrondissement";
    var city = "Paris";
    var postalCode = "75006";
    var country = "France";
    var phone = "6787598473";

    //Création de l'objet adresse
    var addressObject = customerHelper.createAddressObject(address, district, city, postalCode, country, phone);

    //Objet attendu
    var expectedObject =  {
                        address: address,
                        address2: "",
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

    //Vérification de l'objet adresse créé par le helper
    expect(addressObject).toEqual(expectedObject);
});

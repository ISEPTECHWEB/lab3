import React from 'react';
import ReactDOM from 'react-dom';
import {componentsHelper} from '../Helpers/ComponentsHelper';
import axios from 'axios';

//Test "tous les champs sont vides"
it('verify if all the fields are empty string', () => {

    //Définition de tableaux de champs vides et non-vides
    var allFieldsEmpty = ["", "", "", ""];
    var notAllFieldsEmpty = ["", "test", "", ""];

    //Test de ces tableaux avec la fonction du helper 
    //Le booléen de la fonction permet de switcher entre "au moins un champs vide" et "tous les champs vides"
    var testEmpty = componentsHelper.verifyFieldsNotNull(allFieldsEmpty, true);
    var testNotEmpty = componentsHelper.verifyFieldsNotNull(notAllFieldsEmpty, true);

    //Vérification des résultats obtenus
    expect(testEmpty).toEqual(true);
    expect(testNotEmpty).toEqual(false);

});

//Test "au moins un champs est vide"
it('verify if at least one field is an empty string', () => {

    //Définition de tableaux de champs vides et non-vides
    var allFieldsEmpty = ["", "", "", ""];
    var notAllFieldsEmpty = ["", "test", "", ""];

    //Test de ces tableaux avec la fonction du helper
    var testEmpty = componentsHelper.verifyFieldsNotNull(allFieldsEmpty, false); 
    var testNotEmpty = componentsHelper.verifyFieldsNotNull(notAllFieldsEmpty, false);

    //Vérification des résultats obtenus
    expect(testEmpty).toEqual(true);
    expect(testNotEmpty).toEqual(true);

});

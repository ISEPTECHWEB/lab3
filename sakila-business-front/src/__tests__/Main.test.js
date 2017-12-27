import React from 'react';
import ReactDOM from 'react-dom';
import {mainHelper} from '../Helpers/MainHelper';
import axios from 'axios';

//Test de l'authentification de l'admin
it('authentify the admin and not the others', () => {

    var adminRight = ["admin", "adminPwd"]; //variable avec le bon identifiant et mot de passe admin
    var adminWrong = ["admin", "randomPwd"]; // variable avec le bon ID et le mauvais mdp admin
    var adminWrongBis = ["user", "adminPwd"]; // variable avec le mauvais ID et le bon mdp admin
    var otherUser = ["user", "userPwd"]; //variable avec de mauvais ID et mdp 

    //On tente l'authentification avec ces quatre combinaisons
    var authAdminRight = mainHelper.authentify(adminRight[0], adminRight[1]);
    var authAdminWrong = mainHelper.authentify(adminWrong[0], adminWrong[1]);
    var authAdminWrongBis = mainHelper.authentify(adminWrongBis[0], adminWrongBis[1]);
    var authOther = mainHelper.authentify(otherUser[0], otherUser[1]);

    //On vérifie que seul la bonne combinaison est validée
    expect(authAdminRight).toEqual(true);
    expect(authAdminWrong).toEqual(false);
    expect(authAdminWrongBis).toEqual(false);
    expect(authOther).toEqual(false);
    

});

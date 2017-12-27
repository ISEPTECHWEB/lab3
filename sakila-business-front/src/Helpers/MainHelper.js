  //Constante choiceHelper contenant les méthodes principales utilisée pour modifier les listes de choix
    const mainHelper = {

        //Ajout d'un choix à la liste
        authentify: (id, password) => {
            if(id === "admin" && password === "adminPwd"){
                return true;
            }
            return false;
        }

    };

    export {mainHelper};
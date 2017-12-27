
//Constante mainHelper contenant les méthodes principales utilisées par le composant Main
const mainHelper = {

    //Authentification
    authentify: (id, password) => {
        if(id === "admin" && password === "adminPwd"){
            return true;
        }
        return false;
    }

};

export {mainHelper};
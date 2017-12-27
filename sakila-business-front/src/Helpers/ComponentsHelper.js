
//Constante componentsHelper contenant les méthodes principales utilisées par tous les composants
const componentsHelper = {

    //Vérification de la nullité de champs
    verifyFieldsNotNull: (fields, everyField) => { // (liste de champs, tous les champs doivent être nuls ?)
        
        //Test : "Tous les champs sont nuls ?"
        if(everyField){
            for(var i in fields){
                if(fields[i] !== "") return false;
            }
            return true;
        }

        //Test : "Au moins un champs est nul"
        else{
            for(i in fields){
                if(fields[i] === "") return true
            }
            return false;
        }
    },

    //Vérification de la touche entrée à l'appui sur le clavier
    testEnter(keyCode){
        return keyCode===13 ? true : false;
    }

};

export {componentsHelper};
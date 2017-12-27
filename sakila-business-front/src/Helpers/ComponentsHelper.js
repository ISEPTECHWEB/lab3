    //Constante choiceHelper contenant les méthodes principales utilisée pour modifier les listes de choix
    const componentsHelper = {

        verifyFieldsNotNull: (fields, everyField) => {
            if(everyField){
                for(var i in fields){
                    if(fields[i] !== "") return false;
                }
                return true;
            }
            else{
                for(i in fields){
                    if(fields[i] === "") return true
                }
                return false;
            }
        },

        testEnter(keyCode){
            return keyCode===13 ? true : false;
        }

    };

    export {componentsHelper};
import React, { Component } from 'react';
import Actor from './Actor';
import CircularProgress from 'material-ui/CircularProgress';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import {actorHelper} from '../Helpers/ActorHelper'
import {componentsHelper} from '../Helpers/ComponentsHelper';

//Composant Acteurs
class Actors extends Component {

    //Constructeur
    constructor(){
        super();
        //Etat : acteurs chargés ou non, id, prénom et nom de l'acteur sélectionné, modif en cours ou non
        this.state = {
            actors : null,
            actorId: null,
            firstName: "",
            lastName: "",
            pending: false
        }
    }

    //Rendu des champs 
    renderFields(){
        return(
        
            <Paper className="addBlocActors"> 

                {/*----------- Champs --------------*/}
                <TextField
                    hintText="Enter your name"
                    floatingLabelText="First name"
                    onChange={this.changeFirstName}
                    value={this.state.firstName}
                    onKeyDown={this.testEnterKey}
                /> 

                <br/>

                <TextField
                    hintText="Enter your last name"
                    floatingLabelText="Last name"
                    onChange={this.changeLastName}
                    value={this.state.lastName}
                    onKeyDown={this.testEnterKey}
                /> 

                <br/>

                {/* Ajout d'un symbole de chargement d'un create ou update */}
                {this.state.pending ? <CircularProgress className="loadProgress" size={25} thickness={3} /> : ""}
            

                {/*---------------- Boutons de update/create et reset ---------------------*/}
                <RaisedButton
                    label={this.state.actorId? "Update" : "Create"}
                    //Bouton bleu si tous les champs sont rempli
                    primary={ 
                        (componentsHelper.verifyFieldsNotNull([this.state.firstName, this.state.lastName], false))  
                        ? false : true }
                    //Bouton grisé si aucun champ n'est rempli
                    disabled={ 
                        (componentsHelper.verifyFieldsNotNull([this.state.firstName, this.state.lastName], false)) 
                    ? true : false }
                    //Update ou create au clic
                    onClick={this.state.actorId ? this.updateActor : this.createActor}
                />

                <RaisedButton
                    label="Reset"
                    secondary={true} //Bouton rouge
                    //Bouton grisé si aucun champ n'est rempli
                    disabled={
                        (componentsHelper.verifyFieldsNotNull([this.state.firstName, this.state.lastName], true)) 
                        ? true : false }
                    //Reset au clic
                    onClick={this.resetFields}
                />

          </Paper>
        );
    }

    //Affichage des champs Acteurs
    renderActors = () => this.state.actors ? 
        //Affichage des acteurs si le chargement est fait
        this.state.actors.map(
                                t => <Actor key={t.actorId} id={t.actorId} {...t} 
                                        deleteActor={this.deleteActor} fillActor={this.fillActor}/>
                            ) 
        : //Sinon affichage de symboles de chargement dans les cases contenant du texte
        <TableRow>

            <TableRowColumn> <CircularProgress /> </TableRowColumn>
            <TableRowColumn> <CircularProgress /> </TableRowColumn>
            <TableRowColumn> <CircularProgress /> </TableRowColumn>
            <TableRowColumn >                     </TableRowColumn>

        </TableRow>
    ;


    //Test avant ajout ou update
    testEnterKey = (e) => {
        if(componentsHelper.testEnter(e.keyCode) //Test de la touche entrée
            && 
            //Test champs tous remplis : verif(champs, tous vides?)
            !(componentsHelper.verifyFieldsNotNull([this.state.firstName, this.state.lastName], false)))
            {

            this.state.actorId ? this.updateActor() : this.createActor(); //Update/ Create
        }
    }

    //--------- MISE A JOUR CHAMPS ----------

    //Mise à jour du prénom 
    changeFirstName = (e) => {
        this.setState({firstName: e.target.value});
    }

    //Mise à jour du nom
    changeLastName = (e) => {
        this.setState({lastName: e.target.value});
    }
    
    //----------- UPDATE/ CREATE/ DELETE ------------

    //Mise à jour d'un acteur
    updateActor = () => {
        this.setState({pending: true}); //Affichage du symbole chargement => enlevé après chargement des acteurs

        //Requête axios pour l'update
        actorHelper.updateRequest(this.state.actorId, this.state.firstName, this.state.lastName)
            .then((response)=>{ //En cas de succès

                //Timer avant les opérations pour que le symbole chargement s'affiche
                setTimeout(()=>{
                    console.log('Update');
                    this.loadActors(); //Rechargement des acteurs
                    this.resetFields(); //Vidage des champs
                }, 5); //5 millisecondes

            })
            .catch((error)=>{ //En cas d'échec
                this.setState({pending: false}); //On enlève le symbole chargement
            });
    }

    //Suppression d'un acteur
    deleteActor = (id) => {
        //Requête axios pour la suppression
        actorHelper.deleteRequest(id)
            .then((response)=>{ //Succès
                console.log('Delete');
                this.loadActors(); //Rechargement des acteurs
            })
            .catch((error)=>{
            });
    }

    //Création d'un acteur
    createActor = () => {

        this.setState({pending: true}); //Symbole chargement

        //Requête axios pour la création
        actorHelper.createRequest(this.state.firstName,this.state.lastName)
            .then((response)=>{
                //Timer pour affichage du symbole chargement
                setTimeout(()=>{
                    console.log('Create');
                    this.loadActors(); //Rechargement acteurs
                    this.resetFields(); //Vidage des champs
                }, 5);
            })
            .catch((error)=>{
                this.setState({pending: false}); //Disparition symbole chargement
            });
    }

    //----- FONCTIONS ANNEXES ------

    //Fonction remplissage des champs acteurs
    fillActor = (id, first, last) => {
        this.setState({actorId: id});
        this.setState({firstName: first});
        this.setState({lastName: last});
    }

    //Fonction vidage des champs
    resetFields = () => {
        this.fillActor(null, "", "");
    }

    //Chargement des acteurs
    loadActors(){
        //Requête axios pour le chargement des acteurs
        actorHelper.loadRequest()
            .then((response)=>{
                this.setState({actors: response.data}); //Mise à jour de la liste des acteurs
                this.setState({pending: false}); //Arrêt du symbole chargement en cas d'update ou de création
            })
            .catch((error)=>{
                this.setState({pending: false}); //Arrêt du symbole chargement en cas d'update ou de création
            });
    }


    //----- RENDU GENERAL ---------
    render() {
        return(
            <div>

                {/* Affichage des champs */}
                {this.renderFields()}

                <Paper>
                    {/*------------- Tableau contenant les acteurs  ------------------*/}
                    <Table fixedHeader={true} height="250px">

                        {/*----- Header du tableau -------*/}
                        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>

                            <TableRow>
                                <TableHeaderColumn> ID         </TableHeaderColumn>
                                <TableHeaderColumn> First Name </TableHeaderColumn>
                                <TableHeaderColumn> Last Name  </TableHeaderColumn>
                                <TableHeaderColumn>            </TableHeaderColumn>
                            </TableRow>

                        </TableHeader>

                        {/*----- Contenu du tableau ------*/}
                        <TableBody displayRowCheckbox={false}>
                            
                            {/* Affichage des acteurs */}
                            {this.renderActors()}

                        </TableBody>

                    </Table>

                </Paper>

            </div>
        );
    }


    //Lorsque le composant a été généré
    componentDidMount() {
        this.loadActors(); //Chargement des acteurs
    }

}

export default Actors;

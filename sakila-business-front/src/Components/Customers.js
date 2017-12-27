import React, { Component } from 'react';
import Customer from './Customer';
import CircularProgress from 'material-ui/CircularProgress';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import {customerHelper} from '../Helpers/CustomerHelper';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {componentsHelper} from '../Helpers/ComponentsHelper';

//Composant Clients
class Customers extends Component {

    constructor(){
        super();
        /* Etat : clients chargés ou non, 
        id, prénom,nom, email, status, téléphone et éléments d'adresse 
        du client sélectionné, modif en cours ou non*/
        this.state = {
            customers : null,
            customerId : null,
            firstName: "",
            lastName: "",
            email: "",
            active: "",
            address: "", 
            district: "", 
            city: "", 
            postalCode: "", 
            country: "",
            phone: "",
            pending: false
        }
    }

    //Rendu des champs
    renderFields(){
        return(

          <Paper className="addBlocCustomer">

            {/*----------- Champs --------------*/}
            <SelectField floatingLabelText="Status" value={this.state.active} onChange={this.changeActive}>
                <MenuItem value={0} primaryText="Inactive" />
                <MenuItem value={1} primaryText="Active" />
            </SelectField>

            <h4 className="titlesDiv">INFOS</h4>

            <TextField
                hintText="Enter your name"
                floatingLabelText="First name"
                onChange={this.changeFirstName}
                value={this.state.firstName}
                onKeyDown={this.testEnterKey}
            /> 

            <TextField
                hintText="Enter your last name"
                floatingLabelText="Last name"
                onChange={this.changeLastName}
                value={this.state.lastName}
                onKeyDown={this.testEnterKey}
            /> 

            <br/>

            <TextField
                hintText="Enter your email"
                floatingLabelText="Email"
                onChange={this.changeEmail}
                value={this.state.email}
                onKeyDown={this.testEnterKey}
            /> 

            <TextField
                hintText="Enter your phone number"
                floatingLabelText="Phone number"
                onChange={this.changePhone}
                value={this.state.phone}
                onKeyDown={this.testEnterKey}
            /> 

            <h4 className="titlesDiv">ADDRESS</h4>

            <TextField
                hintText="Enter your address"
                floatingLabelText="Address"
                onChange={this.changeAddress}
                value={this.state.address}
                onKeyDown={this.testEnterKey}
            /> 

            <TextField
                hintText="Enter your district"
                floatingLabelText="District"
                onChange={this.changeDistrict}
                value={this.state.district}
                onKeyDown={this.testEnterKey}
            /> 

            <TextField
                hintText="Enter your city"
                floatingLabelText="City"
                onChange={this.changeCity}
                value={this.state.city}
                onKeyDown={this.testEnterKey}
            /> 

            <br/>

            <TextField
                hintText="Enter your postal code"
                floatingLabelText="Postal code"
                onChange={this.changePostalCode}
                value={this.state.postalCode}
                onKeyDown={this.testEnterKey}
            /> 

            <TextField
                hintText="Enter your country"
                floatingLabelText="Country"
                onChange={this.changeCountry}
                value={this.state.country}
                onKeyDown={this.testEnterKey}
            /> 

            <br/>

            {/* Ajout d'un symbole de chargement d'un create ou update */}
            {this.state.pending ? <CircularProgress className="loadProgress" size={25} thickness={3} /> : ""}

            {/*---------------- Boutons de update/create et reset ---------------------*/}
            <RaisedButton
                label={this.state.customerId? "Update" : "Create"}
                //Bouton bleu si tous les champs sont remplis
                primary={ 
                    (componentsHelper.verifyFieldsNotNull(
                        [this.state.firstName, this.state.lastName, this.state.email, this.state.address], false)) 
                    ? false : true }
                //Bouton grisé si aucun champ n'est rempli
                disabled={
                    (componentsHelper.verifyFieldsNotNull(
                        [this.state.firstName, this.state.lastName, this.state.email, this.state.address], false))  
                    ? true : false}
                //Update ou create au clic
                onClick={this.state.customerId? this.updateCustomer : this.createActor}
            />

            <RaisedButton
                label="Reset"
                secondary={true} //Bouton rouge
                //Bouton grisé si aucun champ n'est rempli
                disabled={
                    (componentsHelper.verifyFieldsNotNull(
                        [this.state.firstName, this.state.lastName, this.state.email, this.state.address], true))  
                    ? true : false}
                //Reset au clic
                onClick={this.resetFields}
            />

          </Paper>
        );
    }

    //Affichage des clients 
    renderCustomers = () => this.state.customers ? 
        //Affichage des clients si le chargement est fait
        this.state.customers.map(
                        t => <Customer key={t.customerId} id={t.customerId} {...t} 
                            fillCustomer={this.fillCustomer} deleteCustomer={this.deleteCustomer} />
                        ) 
        : //Sinon affichage de symboles de chargement dans les cases contenant du texte
        <TableRow>
            <TableRowColumn> <CircularProgress /> </TableRowColumn>
            <TableRowColumn> <CircularProgress /> </TableRowColumn>
            <TableRowColumn ><CircularProgress /> </TableRowColumn>
            <TableRowColumn ><CircularProgress /> </TableRowColumn>
            <TableRowColumn> <CircularProgress /> </TableRowColumn>
            <TableRowColumn> <CircularProgress /> </TableRowColumn>
            <TableRowColumn>                      </TableRowColumn>
        </TableRow>
        ;

    //--------- MISE A JOUR CHAMPS ----------

    //Mise à jour du prénom 
    changeFirstName = (e) => {
        this.setState({firstName: e.target.value});
    }

    //Mise à jour du nom 
    changeLastName = (e) => {
        this.setState({lastName: e.target.value});
    }

    //Mise à jour de l'email 
    changeEmail = (e) => {
        this.setState({email: e.target.value});
    }

    //Mise à jour du status 
    changeActive = (e) => {
        var active = e.target.innerHTML === "Active" ? 1 : 0;
        this.setState({active: active});
    }

    //Mise à jour de l'adresse 
    changeAddress = (e) => {
        this.setState({address: e.target.value});
    }

    //Mise à jour de la ville 
    changeCity = (e) => {
        this.setState({city: e.target.value});
    }

    //Mise à jour du district 
    changeDistrict = (e) => {
        this.setState({district: e.target.value});
    }

    //Mise à jour du code postal 
    changePostalCode = (e) => {
        this.setState({postalCode: e.target.value});
    }

    //Mise à jour du pays 
    changeCountry = (e) => {
        this.setState({country: e.target.value});
    }

    //Mise à jour du numéro de téléphone 
    changePhone = (e) => {
        this.setState({phone: e.target.value});
    }

    //----------- UPDATE/ CREATE/ DELETE ------------
    updateCustomer = () => {
        this.setState({pending: true}); //Affichage du symbole chargement => enlevé après chargement des clients
        
        //Création de l'objet adresse
        var address = customerHelper.createAddressObject(this.state.address, this.state.district,
            this.state.city, this.state.postalCode, this.state.country);

        //Requête axios pour l'update
        customerHelper.updateRequest(this.state.customerId, this.state.firstName, this.state.lastName, address)
            .then((response)=>{

                //Timer avant les opérations pour que le symbole chargement s'affiche
                setTimeout(()=>{ //En cas de succès
                    console.log('Update');
                    this.loadCustomers(); //Rechargement des clients
                    this.resetFields(); //Vidage des champs
                }, 5);
            })
            .catch((error)=>{ //En cas d'échec
                this.setState({pending: false}) //On enlève le symbole chargement
            });
    }

    //Suppression d'un client
    deleteCustomer = (id) => {
        //Requête axios pour la suppression
        customerHelper.deleteRequest(id).then((response)=>{ //Succès
            console.log('Delete');
            this.loadCustomers(); //Rechargement des clients
        })
        .catch((error)=>{
        });
    }

    //Création d'un client
    createActor = () => {

        var address = customerHelper.createAddressObject(this.state.address, this.state.district,
            this.state.city, this.state.postalCode, this.state.country); //Symbole chargement

        //Requête axios pour la création
        customerHelper.createRequest(this.state.firstName,this.state.lastName, address)
        .then((response)=>{
            //Timer pour affichage du symbole chargement
            setTimeout(()=>{
                console.log('Create');
                this.loadActors(); //Rechargement clients
                this.resetFields(); //Vidage des champs
            }, 5);
        }).catch((error)=>{
            this.setState({pending: false}); //Disparition symbole chargement
        });
    }

    //----- FONCTIONS ANNEXES ------

    //Fonction remplissage des champs acteurs
    fillCustomer = (id, first, last, email, active, address) => {
        this.setState({customerId: id});
        this.setState({firstName: first});
        this.setState({lastName: last});
        this.setState({email: email});
        this.setState({active: active});
        this.setState({address: address.address});
        this.setState({city: address.city.city});
        this.setState({postalCode: address.postalCode});
        this.setState({district: address.district});
        this.setState({country: address.city.country.country});
        this.setState({phone: address.phone});
    }

    //Fonction vidage des champs
    resetFields = () => {
        var emptyAddress = customerHelper.createAddressObject("", "", "", "", "", "");
        this.fillCustomer(null, "", "", "", "", emptyAddress);
    }

    //Test avant ajout ou update
    testEnterKey = (e) => {
        if(componentsHelper.testEnter(e.keyCode) //Test de la touche entrée
            && 
            //Test champs tous remplis : verif(champs, tous vides?)
            !(componentsHelper.verifyFieldsNotNull([this.state.firstName, this.state.lastName, this.state.active,
                this.state.address, this.state.city, this.state.country, this.state.district, this.state.email,
                this.state.phone], false)))
            {

            this.state.actorId ? this.updateActor() : this.createActor(); //Update/ Create
        }
    }

    //Chargement des clients
    loadCustomers(){
        //Requête axios pour le chargement des acteurs
        customerHelper.loadRequest()
            .then((response)=>{
                this.setState({customers: response.data}); //Mise à jour de la liste des acteurs
                this.setState({pending: false}); //Arrêt du symbole chargement en cas d'update ou de création
            }).catch((error)=>{
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
                    {/*------------- Tableau contenant les clients  ------------------*/}
                    <Table fixedHeader={true} height="600px">

                        {/*----- Header du tableau -------*/}
                        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                            <TableRow>
                                <TableHeaderColumn> ID         </TableHeaderColumn>
                                <TableHeaderColumn> First Name </TableHeaderColumn>
                                <TableHeaderColumn> Last Name  </TableHeaderColumn>
                                <TableHeaderColumn> Email      </TableHeaderColumn>
                                <TableHeaderColumn> Address    </TableHeaderColumn>
                                <TableHeaderColumn> Phone      </TableHeaderColumn>
                                <TableHeaderColumn>            </TableHeaderColumn>
                            </TableRow>
                        </TableHeader>

                        {/*----- Contenu du tableau ------*/}
                        <TableBody displayRowCheckbox={false}>

                            {/* Affichage des clients */}
                            {this.renderCustomers()}

                        </TableBody>

                    </Table>

                </Paper>
            </div>
        );
    }

    //Lorsque le composant a été généré
    componentDidMount() {
        this.loadCustomers(); //Chargement des clients
    }

}


export default Customers;

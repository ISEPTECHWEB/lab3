'use strict';

App.controller('CustomerController', ['$scope', 'CustomerService', function($scope, CustomerService) {
          var self = this;
          self.customer={customerId:null,lastName:'',firstName:'', email:''};
          self.customers=[];
              
          self.fetchAllCustomers = function(){
              CustomerService.fetchAllCustomers()
                  .then(
      					       function(d) {
      						        self.customers = d;
      					       },
            					function(errResponse){
            						console.error('Error while fetching Currencies');
            					}
      			       );
          };
           
          self.createCustomer = function(customer){
              CustomerService.createCustomer(customer)
		              .then(
                      self.fetchAllCustomer, 
				              function(errResponse){
					               console.error('Error while creating Customer.');
				              }	
                  );
          };

         self.updateCustomer = function(customer){
              CustomerService.updateCustomer(customer)
              .then(
                      self.fetchAllCustomers, 
				              function(errResponse){
					               console.error('Error while updating Customer.');
				              }	
                  );
          };

         self.deleteCustomer = function(customerId){
              CustomerService.deleteCustomer(customerId)
		              .then(
				              self.fetchAllCustomers, 
				              function(errResponse){
					               console.error('Error while deleting Customer.');
				              }	
                  );
          };

          self.fetchAllCustomers();

          self.submit = function() {
              if(self.customer.customerId==null){
                  console.log('Saving New Customer', self.customer);    
                  self.createCustomer(self.customer);
              }else{
                  console.log('Customer updating with id ', self.customer.customerId);
                  console.log('Customer: ', self.customer);
                  self.updateCustomer(self.customer);
              }
              self.reset();
          };
              
          self.edit = function(customerId){
              console.log('id to be edited', customerId);
              for(var i = 0; i < self.customers.length; i++){
                  if(self.customers[i].customerId == customerId) {
                     self.customer = angular.copy(self.customers[i]);
                     break;
                  }
              }
          };
              
          self.remove = function(customerId){
              console.log('id to be deleted', customerId);
              for(var i = 0; i < self.customers.length; i++){
                  if(self.customers[i].customerId == customerId) {
                     self.reset();
                     break;
                  }
              }
              self.deleteCustomer(customerId);
          };

          
          self.reset = function(){
              self.customer={customerId:null,lastName:'',firstName:'', email:''};
              $scope.myForm.$setPristine(); //reset Form
          };

      }]);

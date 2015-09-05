(function(){
	'use strict'

	var moduleID = 'myapp';
	var ctrlID = 'myCtrl'
	var servID = 'myServ';
	var ctrlInjectParams = ['myServ'];
	var factInjectParams = ['$http'];
	
	angular.module(moduleID,[])
	
	.factory(servID,myServ)

	.controller(ctrlID,myCtrl);
	
	myServ.$inject = factInjectParams;
	function myServ($http){
		
		return {
			staticMsg: 'Hello From Service',
			getPersons: Persons,
			getPersonById: PersonByID,
			postPerson: postPerson,
			deletePerson: PersonDelete,
			putPerson: PersonUpdate
		};
		
		function Persons(){
			return $http.get('/persons').then(function(res){
					return res.data;
				});
		};
		
		function PersonByID(id){
			return $http.get('/person/'+id).then(function(res){
					return res.data;
				});	
		};
		
		function postPerson(person){
			$http.post('/person',person);
		};
		
		function PersonDelete(id){
			$http.delete('/person/'+ id);
		};
		
		function PersonUpdate(per){
			$http.put('/person/'+ per.id,per);
		};
		
	};
	
	
	myCtrl.$inject = ctrlInjectParams;
	function myCtrl(myServ){
		var vm = this;
		vm.msg = myServ.staticMsg;
		vm.dtlsMsg = '(select one from above)';
		vm.showDtls = false;
		
		function initialData(){
			myServ.getPersons().then(function(res){
				vm.persons = res;
			});
		};
		initialData();
		
		vm.newPerson = function(){
			faker.locale = 'en_IND';
			var per = {
						first_name: faker.name.firstName(),
	  					last_name:	faker.name.lastName(),
						email: faker.internet.email()
					};

			myServ.postPerson(per);
			initialData();
		};
		
		vm.selectPerson = function(id){
			myServ.getPersonById(id).then(function(res){
				vm.selPerson = res;
			});
			vm.dtlsMsg = '';
			vm.showDtls = true;
				
		};
		
		vm.deletePerson = function(id){
			myServ.deletePerson(id);
			initialData();
		};
		
		vm.updatePerson = function(per){
			myServ.putPerson(per);
			initialData();
		};
	
	};

})();
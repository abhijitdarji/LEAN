var dbjson = module.exports = {};
var faker = require('faker'); // to generate dummy data
var _ = require('lodash'); // to loop and repeat dummy data
var fs = require('fs'); // file system to access local files
var uuid = require('uuid'); // unique id 

faker.locale = "en_IND"; // to get indian names

dbjson.initializeDB = function(){
	var data = {
	
		persons: _.times(5,function(n) {
					return {
								id: uuid(),
								first_name: faker.name.firstName(),
								last_name:	faker.name.lastName(),
								email: faker.internet.email()
							};
				}),
		cities: _.times(5,function(n) {
					return {
								city_name: faker.address.city(),
							};
				})
	};
 
    // write formatted json to file
    fs.writeFileSync("db.json",JSON.stringify(data,0,4));

	return "Database Created!";
};

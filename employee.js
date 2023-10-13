const faker = require('@faker-js/faker');

function generateEmployees() {
    var users = [];
    for (var id = 0; id < 50; id++) {
      var firstName = faker.person.firstName(); 
      var lastName = faker.person.lastName();    
      var email = faker.internet.email();
      users.push({
        "id": id,
        "first_name": firstName,
        "last_name": lastName,
        "email": email
      });
    }
  
    return { "users": users };
   
  }



module.exports = {generateEmployees};



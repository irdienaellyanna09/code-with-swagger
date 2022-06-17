let users;
const { faker } = require('@faker-js/faker');
const bcrypt = require("bcryptjs");
//const userName = faker.name.findName(); 
//const UserEmail = faker.internet.email();
//const userpassword = faker.internet.password();
const saltRounds = 10;
let encryptedPassword;
/**
	 * @remarks
	 * This method is not implemented yet. To register a new user, you need to call this method.
	 * 
	 * @param {*} userName 
	 * @param {*} userpassword 
     * @param {*} UserEmail
	 * @param {*} encryptedPassword
	 */

class User {
	static async injectDB(conn) {
		users = await conn.db("projectLab_7").collection("users")		
	}
    //////////////////////////////*******Password hashing by using bycrypt*******//////////////////////////////
	static async register(userName, UserEmail,userpassword,encryptedPassword) {
	
		// TODO: Check if username exists
		const user = await users.findOne({							
			$and: [{ 
				'username': userName,	
				'email':UserEmail,			
				'password': userpassword,
				

			}]
		}).then(async user =>{
			if (user) {
				if ( user.username == userName )		//Used to check whether the username already exists or not
				{
					return "The username already exist!";
				}
			}
			else
			{
				// TODO: Save user to database			//if the username is not exist, then create new user account
				await users.insertOne({					//To insert a new user account in DB
					'username' : userName,
					'email': UserEmail,
					'password' : userpassword,
					'encrypt': encryptedPassword,
				})
				return "New user is created";
			}
		})
		return user;	
	}

	static async login(userName, UserEmail,userpassword) {
		// TODO: Check if username exists
		const user = await users.findOne({														
			$or: [
				{'username': userName},	
                {'email': UserEmail},
				{'password': userpassword}
			]				
		}).then(async user =>{		
		// TODO: Validate username , password , email
			if (user) {																	
				if ( user.username != userName && user.password == userpassword && user.email == UserEmail) {		//Username is Invalid
					return "The Username is invalid";
				}
				else if ( user.username == userName && user.password != userpassword && user.email == UserEmail ) {	//Or if the User's Password is Invalid
					return "The Password is invalid";
				}
				else if ( user.username == userName && user.password == userpassword && user.email != UserEmail ) {	//Or if the User's Email id is Invalid
					return "The Email id is invalid";
				}
				else																	//else the username, password and email entered by the user is valid
				{
					// TODO: Return user object
					return user;	
				}
			}
			else																		//else the the Username doesn't exists / doesn't match 
			{
				return "ERROR! The information is not MATCH";
			}
		})
		return user;
	}
	static async update (userName,userpassword) {
		//To update
			return users.findOne(
			{'username': userName,
				'userpassword': userpassword}
			).then(user => {
				console.log(user)
	
			if (user){
				return users.updateOne({
					'username': userName,
					'userpassword': userpassword},
					{"$set": { 'age' : '24'}
				}).then(result => {
						console.log(result)
				}) 
			}
			else {
				return "The username is wrong "
			}
			})
		  }
		
		static async delete(userName, UserEmail) {
			
			const user = await users.findOne({                            
				'username': userName,  
				'email': UserEmail,
			
			}).then(async user =>{    
			
			  if (user) {                                  
				if ( user.username != userName && user.email == UserEmail) {    //Username is Invalid
				  return "The information is invalid";
				}
				
				else                                  
				{
					await users.deleteOne({'username': userName})
	
				  return "The information is delete successfully" 
			}
			  }
			  else {
				return "The username is invalid"
			  }                               //else the the Username doesn't exists / doesn't match
			  
			})
			return user;
		  }
	
	}
	
	module.exports = User;
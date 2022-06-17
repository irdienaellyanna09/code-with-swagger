let staffs;
const { faker } = require('@faker-js/faker');
//const { PHONE_NUMBER } = require('@faker-js/faker/definitions/phone_number');
const bcrypt = require("bcryptjs");
//const staffName = faker.name.findName(); 
//const UserEmail = faker.internet.email();
//const userpassword = faker.internet.password();
const saltRounds = 10;
let encryptedPassword;
/**
	 * @remarks
	 * This method is not implemented yet. To register a new user, you need to call this method.
	 * 
	 * @param {*} staffName 
	 * @param {*} staffpassword 
     * @param {*} staffEmail
	 * @param {*} encryptedPassword
	 */

class Staff {
	static async injectDB(conn) {
		staffs = await conn.db("projectLab_7").collection("staffs")		
	}
    //////////////////////////////*******Password hashing by using bycrypt*******//////////////////////////////
	static async register(staffName, staffEmail,staffpassword,staffrole,staffnumber) {
	
		// TODO: Check if username exists
		const staff = await staffs.findOne({							
			$and: [{ 
				'staff_name': staffName,	
				'staff_email':staffEmail,			
				'staff_password': staffpassword,
                'job_type': staffrole,
                'staffcontact_no': staffnumber
				

			}]
		}).then(async staff =>{
			if (staff) {
				if ( staff.staff_name == staffName )		//Used to check whether the username already exists or not
				{
					return "The staffname already exist!";
				}
			}
			else
			{
				// TODO: Save user to database			//if the username is not exist, then create new user account
				await staffs.insertOne({					//To insert a new user account in DB
				'staff_name':staffName,	
				'staff_email':staffEmail,			
				'staff_password': staffpassword,
				
				})
				return "New staff is created";
			}
		})
		return staff;	
	}

	static async login(staffName, staffEmail,staffpassword) {
		// TODO: Check if username exists
		const staff = await staffs.findOne({														
			$or: [
				{'staff_name': staffName},	
                {'staff_email': staffEmail},
				{'staff_password': staffpassword}
			]				
		}).then(async staff =>{		
		// TODO: Validate username , password , email
			if (staff) {																	
				if ( staff.staffname != staffName && staff.password == staffpassword && staff.email == staffEmail) {		//Username is Invalid
					return "The Staffname is invalid";
				}
				else if ( staff.staffname == staffName && password.staffpassword != staffpassword && staff.email == staffEmail ) {	//Or if the User's Password is Invalid
					return "The Password is invalid";
				}
				else if ( staff.staffname == staffName && staff.password == staffpassword && staff.email != staffEmail ) {	//Or if the User's Email id is Invalid
					return "The Staffemail is invalid";
				}
				else																	//else the username, password and email entered by the user is valid
				{
					// TODO: Return user object
					return staff;	
				}
			}
			else																		//else the the Username doesn't exists / doesn't match 
			{
				return "ERROR! The information is not MATCH";
			}
		})
		return staff;
	}
	static async update (staffName,staffpassword) {
		//To update
			return staffs.findOne(
			{'staff_name': staffName,
				'staff_password': staffpassword}
			).then(staff => {
				console.log(staff)
	
			if (staff){
				return staff.updateOne({
					'staff_name': staffName,
					'staff_password': staffpassword},
					{"$set": { 'job_type' : 'admin'}
				}).then(result => {
						console.log(result)
				}) 
			}
			else {
				return "The staffname is wrong "
			}
			})
		  }
		
		static async delete(staffName, staffEmail) {
			
			const staff = await staffs.findOne({                            
				'staff_name': staffName,  
				'staff_email': staffEmail,
			
			}).then(async staff =>{    
			
			  if (staff) {                                  
				if ( staff.staffname != staffName && staff.email == staffEmail) {    //Username is Invalid
				  return "The information is invalid";
				}
				
				else                                  
				{
					await staffs.deleteOne({'staff_name': staffName})
	
				  return "The information is delete successfully" 
			}
			  }
			  else {
				return "The staffname is invalid"
			  }                               //else the the Username doesn't exists / doesn't match
			  
			})
			return staff;
		  }
	
	}
	
	module.exports = Staff;
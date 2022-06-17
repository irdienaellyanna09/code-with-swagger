const MongoClient = require("mongodb").MongoClient;
const Staff = require("./staff");
const { faker } = require('@faker-js/faker');
const bcrypt = require("bcryptjs");
const saltRounds = 10;
let encryptedPassword;

name="Diena"
		email="diena@gmail.com"
		password="001"
///////////////////////*******Creating sample user by using Faker-js********//////////////////////////////////////////////////
//const staffName = faker.name.findName(); 
//const staffEmail = faker.internet.email();
//const staffpassword = faker.internet.password();
//const encryptedPassword = "$2a$05$3pqF8gapjY82H.T4G7LNauba.lObTbsVWsBkAh2jEKl"


	bcrypt.genSalt(saltRounds, function (saltError, salt) {
		if (saltError) {
		  throw saltError
		} else {
		  bcrypt.hash(encryptedPassword, salt, function(hashError, hash) {
			if (hashError) {
			  throw hashError
			} else {
				encryptedPassword=hash;
				console.log("Hash:",hash);
			  
			}
		  })
		}
	  })
	//const encryptedPassword = hash

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

describe("Staff Account", () => {
	let client;
	beforeAll(async () => {
		client = await MongoClient.connect(	
		"mongodb+srv://m001-student:m001-mongodb-basics@sandbox.lhdjj.mongodb.net/test",
			{ 
				useNewUrlParser: true
			 }
		);
		Staff.injectDB(client);
	})
	afterAll(async () => {
		await client.close();
	})


	//Test should be pass , if any new staff is created
	test("New staff registration", async () => {				
		const res = await Staff.register("Diena","diena@gmail.com","001")
		expect(res).toBe("New staff is created");		
	})
    // To detect the duplicate user - test will be passed if any duplicate user was found during the user sign up 
	test("Duplicate staffname", async () => {
		const res = await Staff.register("Diena","diena@gmail.com","001",)
		expect(res).toBe("The staffname already exist!");
	})


	//If the username, email and password do not match to any doc saved in db
	test("Staffname doesn't exist to login", async () => {
		const res = await Staff.login("suho","suho@gmail.com","suho12")
		expect(res).toBe("ERROR! The information is not MATCH");
	})

	//If the username do not match to any usernames saved in db
	test("Staff login invalid staffname", async () => {
		const res = await Staff.login("chen","chen@gmail.com","8676767")
		expect(res).toBe("The staffname is invalid");
	})

	//If the password do not match to any passwords saved in db
	test("Staff login invalid password", async () => {
		const res = await Staff.login("Intan","Intan@gmail.com","3456")
		expect(res).toBe("The Password is invalid");
	})

	//If the email id do not match to any email ids saved in db
	test("Staff login invalid staff email", async () => {
		const res = await Staff.login("Intan","123@gmail.com","000")
		expect(res).toBe("The staff email is invalid");
	})

	//If the username,email and password are matched to any existing user, then check for the encrypted password before allowing the user to login in VMSystem
	test("Staff login successfully", async () => {
		const res = await Staff.login(name,email,password)
		
		expect(res.staffName).toBe(name);
		expect(res.staffpassword).toBe(password);
		expect(res.staffEmail).toBe(email);
		//expect(res.encrypt).toBe(encryptedPassword);
	})
	
	test('should run', () => {
	});
});
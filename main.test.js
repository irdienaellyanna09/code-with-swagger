const supertest = require('supertest');
const request = supertest('http://localhost:4000');
const bcrypt = require("bcryptjs");

// const saltRounds = 10;
// let encryptedPassword;
// bcrypt.genSalt(saltRounds, function (saltError, salt) {
// 	if (saltError) {
// 	  throw saltError
// 	} else {
// 	  bcrypt.hash(userpassword, salt, function(hashError, hash) {
// 		if (hashError) {
// 		  throw hashError
// 		} else {
// 			encryptedPassword=hash;
// 			//console.log("Hash:",hash);
		  
// 		}
// 	  })
// 	}
//   })

describe('Express Route Test', function () {

	it('will return hello world', async () => {
		return request.get('/hello')
			.expect(200)
			.expect('Content-Type', /text/)
			.then(res => {
				expect(res.text).toBe('Hello and welcome');
			}); 
	})
	

	it('login successfully', async () => {
		return request
			.post('/login')
			.send({'userName': 'Jody Nader','UserEmail':'Larry.Hilll83@gmail.com' ,'userpassword': "6PWggwqMJY5HLS6" })
			.expect('Content-Type', /text/)
			.expect(200).then(response => {
				expect(response.text).toEqual("login success");
			});
	});

	it('login failed', async () => {
		return request
			.post('/login')
			.send({ 'username': 'Jody Nader', 'email': 'Larry.Hilll83@gmail.com', 'userpassword': "3456" })
			.expect('Content-Type', /text/)
			.expect(404)
			.then(response => {
				expect(response.text).toEqual("Wrong login details")
			});
	});

	it('register', async () => {
		return request
			.post('/register')
			.send({ 'userName': 'jiveya', 'UserEmail': 'jiveya@gmail.com', 'userpassword': "019" })
			.expect('Content-Type', /text/)
			.expect(200).then(response => {
				expect(response.text).toEqual("New user is created");
			});
	});

	it('register failed', async () => {
		return request
			.post('/register')
			.send({ 'username': 'user48', 'email': 'ddde@gmail.com', 'password': "000" })
			.expect('Content-Type', /text/)
			.expect(404).then(response => {
				expect(response.text).toEqual("The username already exist!");
			});
	});

	it('update successful', async () => {
		return request
			.patch('/update')
			.send({ 'userName': 'Elsie Dietrich', 'userpassword': "ehIDSfPPlCLA8aV" })
			.expect('Content-Type', /text/)
			.expect(200).then(response => {
				expect(response.text).toEqual("The username is updated!");
			});
	});

	it('delete', async () => {
		return request
			.delete('/delete')
			.send({ 'userName': 'Louis Green', 'UserEmail': 'Jude_Bruen@yahoo.com', 'userpassword': "GNEkdmVT7cD_n1B"})
			.expect('Content-Type', /text/)
			.expect(200).then(response => {
				expect(response.text).toEqual("The information is delete successfully");
			});
	});

});
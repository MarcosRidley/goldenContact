const json = {
	"validFindOne": {
		"id": 1,
		"username": "Admin",
		"role": "admin",
		"email": "admin@admin.com",
		"password": "$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW"
	},
	"validLoginForm": {
		"email": "admin@admin.com",
		"password": "secret_admin"
	},
	"noEmailLoginForm": {
		"password": "secret_admin"
	},
	"noPasswordLoginForm": {
		"email": "admin@admin.com"
	},
	"invalidLoginForm": {
		"email": "jfladijfaiojdfoiasdjfoafjsoaf@gmail.com",
		"password": "testejlreilajfliajefliajdfa"
	},
	"validData": {
		"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NjY5Njk5MTB9.bljsTAY0G6xFzLU34uzaoMM5QNSoySmEkOIMdOh3atA"
	},
	"noEmail": { "message": "All fields must be filled" },
	"noPassword": { "message": "All fields must be filled" },
	"invalidEntries": { "message": "Incorrect email or password" },
	"validRoleResponse": { "role": "admin" }
}

export default json;
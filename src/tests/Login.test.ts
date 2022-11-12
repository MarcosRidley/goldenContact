import * as sinon from 'sinon';
import * as chai from 'chai';
import * as mocha from 'mocha';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { User } from '../database/models';
import login from './mocks/login';

import { Response } from 'superagent';
import loginService from '../service/login.service';

chai.use(chaiHttp);

const { expect } = chai;

describe('/Login endpoint testing', () => {
	let chaiHttpResponse: Response;
	beforeEach(sinon.restore);

	it('verifies that upon receiving no email it returns the expected message', async () => {
		sinon.stub(User, 'findOne').resolves(login.validFindOne as User);
		chaiHttpResponse = await chai
			.request(app)
			.post('/login')
			.send(login.noEmailLoginForm);

		expect(chaiHttpResponse.status).to.be.equal(400);
		expect(chaiHttpResponse.body).to.be.deep.equal(login.noEmail);
	});

	it('verifies that upon receiving no password it returns the expected message', async () => {
		sinon.stub(User, 'findOne').resolves(login.validFindOne as User);
		chaiHttpResponse = await chai
			.request(app)
			.post('/login')
			.send(login.noPasswordLoginForm);

		expect(chaiHttpResponse.status).to.be.equal(400);
		expect(chaiHttpResponse.body).to.be.deep.equal(login.noPassword);
	});

	it('verifies that upon receiving incorrect email or password it returns the expected message', async () => {
		sinon.stub(User, 'findOne').resolves(login.validFindOne as User);
		chaiHttpResponse = await chai
			.request(app)
			.post('/login')
			.send(login.invalidLoginForm);

		expect(chaiHttpResponse.status).to.be.equal(401);
		expect(chaiHttpResponse.body).to.be.deep.equal(login.invalidEntries);
	});

	it('verifies that upon receiving correct email or password it returns a valid token', async () => {
		sinon.stub(loginService, 'loginUser').resolves(login.validData.token);

		chaiHttpResponse = await chai
			.request(app)
			.post('/login')
			.send(login.validLoginForm);

		expect(chaiHttpResponse.status).to.be.equal(200);
		expect(chaiHttpResponse.body).to.be.deep.equal(login.validData);
	});

	it('verifies that upon receiving incorrect email or password it returns unauthorized', async () => {
		sinon.stub(User, 'findOne').resolves(null);

		chaiHttpResponse = await chai
			.request(app)
			.post('/login')
			.send(login.invalidLoginForm);

		expect(chaiHttpResponse.status).to.be.equal(401);
	});

	it('verifies that upon receiving correct token it returns the user role', async () => {
		sinon
			.stub(loginService, 'validateUserToken')
			.resolves(login.validRoleResponse.role);
		chaiHttpResponse = await chai.request(app).get('/login/validate');

		expect(chaiHttpResponse.status).to.be.equal(200);
		expect(chaiHttpResponse.body).to.be.deep.equal(login.validRoleResponse);
	});
});

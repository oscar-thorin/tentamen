// Mongoose and mocking requests
const sinon = require('sinon');

const mongoose = require('mongoose')
mongoose.set('debug', true)
require('sinon-mongoose')

// initialize the app and models
const app = require('../../index.js')

// sending requests
const agent = require('supertest').agent(app);
// validating results
const expect = require('chai').expect;

// get the model
const Book = mongoose.model('Book')

var mock = sinon.mock(Book)

beforeEach(() => {
	mock.restore(); // Unwraps the spy
	mock = sinon.mock(Book)
});

afterEach( () => {
	mock.verify();
});

	const expected = {
		//...
	}

describe('books.get', ()  => {

	it('Should return an array of all books', (done) => {

		// Given (preconditions)
		mock
		.expects('find')
		.chain('exec')
		.resolves([expected]);

		// When (someting happens)
		agent
		.get('/books')
		.end((err,res) => {
		// Then (something should happen)
			expect(res.status).to.equal(200);
			expect(res.body).to.eql([expected]);
			done();
		});
	});

});
const chai = require('chai');
const { fake, replace } = require('sinon');
const app = require('../app');

const expect = chai.expect;
const should = chai.should();
const assert = chai.assert;

describe('Fake function & Repalce function', function () {

    before(function () {
        this.getMyName = fake.returns('thathsara');
        this.throwError = fake.throws(new Error(500, 'Internal server error'));
        replace(app, 'displayName', function () {return 'dasun';});
        this.asynchronousHi = fake.resolves('Hi');
    });

    it('fake method test: return string', function () {
        expect(this.getMyName()).to.be.a('string');
        expect(this.getMyName()).to.equal('thathsara');
        expect(this.getMyName('param1')).to.equal('thathsara');

    });

    it('error method test: throw error 500 Internal Server Error', function () {
        expect(() => this.throwError()).to.throw(Error);
    });

    it('replace function: displayName method should replace with constant param dasun', function () {
        expect(app.displayName('mahanama')).to.equal('dasun');
        assert.equal(app.displayName('mahanama'), 'dasun', 'return name should be mahanama');
    });

    it('Asynchronous method test', async function () {
        expect(await this.asynchronousHi()).to.equal('Hi');
    });

});
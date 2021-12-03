const chai = require('chai');
// eslint-disable-next-line no-unused-vars
const sinon = require('sinon');
const axios = require('axios').default;
const expect = chai.expect;

describe('API Unit Test', function () {
    
    before(function () {
        console.log('before ...');
        this.getData = async () => {
            let response = await axios.get('http://httpbin.org/get?answer=42');
            return response.data.args.answer;
        };
    });

    after(function () {
        console.log('after ...');
    });

    beforeEach(function () {
        console.log('before each method');
    });

    afterEach(function () {
        console.log('after each method');
    });

    it('test api call', async function () {
        expect(await this.getData()).to.equal('42');
    });

});
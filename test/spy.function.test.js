const { assert } = require('chai');
const {createSandbox} = require('sinon');

const library = {
    add(num1, num2) {
        return num1 + num2;
    },
    substract(num1, num2) {
        return num1 - num2;
    }
};

describe('Spy function', function() {

    const sandbox = createSandbox();

    /**
     * for each method call it prepares the spy
     */
    beforeEach(function() {
        sandbox.spy(library);
    });

    /**
     * after each method call it clear the spy
     */
    afterEach(function() {
        sandbox.restore();
    });

    it('This method should be spied', function() {
        library.add(1, 12); //call method add() once
        assert(library.add.calledOnce, 'add is called once ');
        assert(library.add.getCall(0).args.length == 2, 'add has two parameters only');
        assert.equal(library.add.getCall(0).args[0], 1, 'First param is 1');
        assert.equal(library.add.getCall(0).args[1], 12, 'Second param is 12');
        assert.equal(library.add.getCall(0).returnValue, 13, 'add returns 13');
    });

    // more : https://sinonjs.org/releases/latest/spy-call/

});
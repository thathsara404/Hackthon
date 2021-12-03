const { assert, expect, should } = require('chai');
const {stub} = require('sinon');

const library = {
    divide: function(val1, val2) {
        return val1/val2;
    },
    add: async function(val1, val2) {
        return val1+val2;
    }
};

describe('Stub method test', function() {

    it('Stub divide method', function() {
        let stubDivide = stub(library, 'divide').callsFake(function() {
            return 'divide';
        });
        assert.equal(library.divide(2, 5), 'divide');
        assert.isTrue(stubDivide.called);
        assert.equal(stubDivide.getCall(0).args[0], 2, 'first param values is two');
        assert.equal(stubDivide.getCall(0).args[1], 5, 'first param values is two');
        stubDivide.resetBehavior();
        // print stubDivide.getCall(0) to see more options
    });

    it('Stub async add method', async function() {
        // this stub will return 500 for add() method.
        let stubAsyncAddMethod = stub(library, 'add').callsFake(function() {
            return new Promise((resolve, reject) => {
                setTimeout(()=>resolve(500), 1500); // no reject
            });
        });
        await library.add(10, 50).then((result)=> {
            expect(stubAsyncAddMethod.getCall(0).args[0]).to.equal(10);
            expect(stubAsyncAddMethod.getCall(0).args[1]).to.equal(50);
            expect(result).to.equal(500);
        }).catch((err) => {
            should().not.exist(err);
        });
        
    });
    //read more and do more code : https://sinonjs.org/releases/v9.2.1/stubs/
});
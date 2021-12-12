const Web3 = require('web3');
const StudentContract = require('./studentABI.json');
const Config = require('../config/config');
const privateKey = Config.ETHEREUM.ACCOUNT_PRIVATE_KEY;
const accountAddress = Config.ETHEREUM.ACCOUNT_ADDRESS;

let web3 = new Web3(Config.ETHEREUM.NETWORK);
const myContract = new web3.eth.Contract(StudentContract, Config.ETHEREUM.SMART_CONTRACT_ADDRESS);

// This method executes cost added transactions
const doCostAddedExecution = async (executionMethod) => {
    const networkId = await web3.eth.net.getId();
    const tx = executionMethod;
    const gas = await tx.estimateGas({ from: accountAddress });
    const gasPrice = await web3.eth.getGasPrice();
    const data = tx.encodeABI();
    const nonce = await web3.eth.getTransactionCount(accountAddress);
    
    const signedTx = await web3.eth.accounts.signTransaction({
        to: Config.ETHEREUM.SMART_CONTRACT_ADDRESS,
        data,
        gas,
        // Value: 12 * 10 ** 18,
        gasPrice,
        nonce,
        chainId: networkId
    }, privateKey);
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    console.log('***---Transaction Receipt---*** ', receipt);
};

module.exports = {
    getHelloMessage: async () => {
        console.log('Old data value: ', await myContract.methods.getHello().call());
        const transactionResult = await doCostAddedExecution(myContract.methods.setHello('This is a Test Message'));
        console.log('New data value: ', await myContract.methods.getHello().call());
        return transactionResult;
    },
    registerStudent: async (studentId, studentNic, studentFirstName, studentLastName) => {
        const transactionResult = await doCostAddedExecution(myContract.methods.
            createStudent(studentId, studentNic, studentFirstName, studentLastName));
        return transactionResult;
    },
    getStudentId: async (studentId) => {
        const transactionResult = await myContract.methods.getStudentDetails(studentId).call();
        return transactionResult;
    },
    updateStudentLastScore: async (studentId, marks) => {
        const transactionResult = await doCostAddedExecution(myContract.methods.
            updateStudentLastScore(studentId, marks));
        return transactionResult;
    }
};

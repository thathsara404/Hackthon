'use strict';

const { getHelloMessage, registerStudent, getStudentId, updateStudentLastScore } = require('../util/smartContractUtil');

module.exports = {
    getHelloMessage: async () => {
        try {
            return await getHelloMessage();
        } catch (error) {
            console.error('Error in  get Hello from Ethereum : ', error);
        }
    },
    registerStudent: async (studentId, studentNic, studentFirstName, studentLastName) => {
        try {
            return await registerStudent(studentId, studentNic, studentFirstName, studentLastName);
        } catch (error) {
            console.error('Error in  register student Ethereum : ', error);
        }
    },
    getStudentId: async (studentId) => {
        try {
            return await getStudentId(studentId);
        } catch (error) {
            console.error('Error in retrieving student Ethereum : ', error);
        }
    },
    updateStudentScore: async (studentId, marks) => {
        try {
            return await updateStudentLastScore(studentId, marks);
        } catch (error) {
            console.error('Error in retrieving student Ethereum : ', error);
        }
    }
};


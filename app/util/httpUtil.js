'use strict';
const axios = require('axios').default;

class HttpUtil {
    static async get (uri) {
        const response = await axios.get(uri, {
            credentials: 'same-origin',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.json();
    }

    static async post (uri, data = {}, headers = {}) {
        const response = await axios({
            method: 'post',
            url: uri,
            headers: {
                ...headers
            },
            data: { ...data } });
        return response;
    }

    static async put (uri, data = {}) {
        const response = await axios.put(uri, {
            method: 'PUT',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            data: { ...data }
        });
        return response.json();
    }
}
module.exports = HttpUtil; 

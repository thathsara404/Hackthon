'use strict';

export class HttpUtil {
    static async get (uri) {
        const response = await fetch(uri, {
            credentials: 'same-origin',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.json();
    }

    static async post (uri, data = {}) {
        const response = await fetch(uri, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return response.json();
    }

    static async put (uri, data = {}) {
        const response = await fetch(uri, {
            method: 'PUT',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return response.json();
    }
}

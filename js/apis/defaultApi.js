const END_POINT = 'https://js-todo-list-9ca3a.df.r.appspot.com';

async function fetchWrapper({method, path, data}) {
    let res;

    try {
        if (method === 'GET' || method === 'DELETE') {
            res = await fetch(`${END_POINT}${path}`, {
                method,
            });
        }

        if (method === 'POST' || method === 'PUT') {
            res = await fetch(`${END_POINT}${path}`, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
        }

    } catch (e) {
        throw new Error('Network Error: ' + e);
    }

    if (!res.ok) {
        throw new Error('Server Error. Status: ' + res.status);
    }

    return await res.json();
}

export default {
    get: async function ({path}) {
        return await fetchWrapper({method: 'GET', path});
    },

    post: async function ({path, data}) {
        return await fetchWrapper({method: 'POST', path, data});
    },

    put: async function ({path, data}) {
        return await fetchWrapper({method: 'PUT', path, data});
    },

    delete: async function ({path}) {
        return await fetchWrapper({method: 'DELETE', path});
    },
};

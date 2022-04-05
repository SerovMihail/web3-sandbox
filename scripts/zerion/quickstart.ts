import io from 'socket.io-client'

const BASE_URL = 'wss://api-v4.zerion.io/';

function verify(request, response) {
    // each value in request payload must be found in response meta
    return Object.keys(request.payload).every(key => {
        const requestValue = request.payload[key];
        const responseMetaValue = response.meta[key];
        if (typeof requestValue === 'object') {
            return JSON.stringify(requestValue) === JSON.stringify(responseMetaValue);
        }
        return responseMetaValue === requestValue;
    });
}

const socket = io(`${BASE_URL}address`, {
    transports: ['websocket'],
    timeout: 60000,
    query: {
        api_token:
            'Demo.ukEVQp6L5vfgxcz4sBke7XvS873GMYHy',
    }
});

socket.on('connect', () => console.log('connected'));
socket.on('connect_error', err => console.log(err));

export const addressSocket = {
    namespace: 'address',
    socket: socket,
};

export function get<T>(socketNamespace, requestBody): Promise<T> {
    return new Promise<T>(resolve => {
        const {socket, namespace} = socketNamespace;

        function handleReceive(data) {
            if (verify(requestBody, data)) {
                unsubscribe();
                resolve(data as T);
            }
        }

        const model = requestBody.scope[0];

        function unsubscribe() {
            socket.off(`received ${namespace} ${model}`, handleReceive);
            socket.emit('unsubscribe', requestBody);
        }

        socket.emit('get', requestBody);
        socket.on(`received ${namespace} ${model}`, handleReceive);
    });
}


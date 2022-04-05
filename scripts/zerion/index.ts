import {addressSocket, get} from "./quickstart";

(async function getBalances() {

    try {

        const response = await get<any>(addressSocket, {
            scope: ['assets'],
            payload: {
                address: '0x7e5ce10826ee167de897d262fcc9976f609ecd2b'
            },
        })

        console.log(JSON.stringify(response.payload, null, 2));
    } catch (err) {
        console.error(`err ${err}`)
    }


})();


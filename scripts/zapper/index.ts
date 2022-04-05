import fetch from 'node-fetch';

const PUBLIC_API_KEY_FROM_DOCS = `api_key=96e0cc51-a62e-42ca-acee-910ea7d2a241`; // https://docs.zapper.fi/zapper-api/endpoints
const HOST = `https://api.zapper.fi/v1`;



// interface ApiResponse {
//
// }

// yarn run:zapper
(async function () {

    const result = await fetch(`${HOST}/apps?${PUBLIC_API_KEY_FROM_DOCS}`).then(response => response.json());
    console.log(result[0]);
})();


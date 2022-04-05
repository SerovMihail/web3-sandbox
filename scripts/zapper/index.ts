import fetch from 'node-fetch';

const PUBLIC_API_KEY_FROM_DOCS = `96e0cc51-a62e-42ca-acee-910ea7d2a241`; // https://docs.zapper.fi/zapper-api/endpoints
const HOST = `https://api.zapper.fi/v1`;



// interface ApiResponse {
//
// }

// yarn run:zapper
// (async function getBalances() {
//
//     const result = await fetch(`${HOST}/apps?${PUBLIC_API_KEY_FROM_DOCS}`).then(response => response.json());
//     console.log(result[0]);
// })();

// (async function tokensBalances() {
//     var url = new URL(`${HOST}/protocols/tokens/balances`),
//         params = {'address': '0x98572d655ed2DBaf15Ea003D03e41F493c0fAb73', api_key: PUBLIC_API_KEY_FROM_DOCS}
//     Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
//
//     const result = await fetch(url.toString()).then(response => response.json());
//     console.log(JSON.stringify(result, null, 2));
// })();

(async function transations() {
    var url = new URL(`${HOST}/transactions`),
        params = {'addresses[]': ['0x98572d655ed2DBaf15Ea003D03e41F493c0fAb73'], api_key: PUBLIC_API_KEY_FROM_DOCS}
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

    const result = await fetch(url.toString()).then(response => response.json());
    console.log(JSON.stringify(result, null, 2));
})();


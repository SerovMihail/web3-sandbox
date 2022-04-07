import fetch from 'node-fetch';
import fs from "fs";

type TokenSymbol = string;

type TokenPngUrl = string;

interface Token {
    name: string;
    symbol: TokenSymbol;
    address: string,
    decimals: number,
    chainId: number,
    logoURI: TokenPngUrl
}

interface Response {
    tokens: Token[]
}

(async function fetchTokensList() {
    const result = new Map<TokenSymbol, TokenPngUrl>()

    const response = await fetch('https://unpkg.com/quickswap-default-token-list@1.2.27/build/quickswap-default.tokenlist.json').then(response => response.json()) as Response;

    saveMapTokenAssetBySymbolAsJsonFile(response.tokens);
    saveMapTokenAssetByAddressAsJsonFile(response.tokens);

    // console.log(JSON.stringify(firstMap, null, 2));
    // console.log(JSON.stringify(secondMap, null, 2));
})();

function saveMapTokenAssetBySymbolAsJsonFile(tokens: Token[]) {
    const result = new Map<TokenSymbol, TokenPngUrl>()

    for (const token of tokens) {
        result.set(token.symbol, token.logoURI);
    }

    fs.writeFile(`${new Date().getMilliseconds()}tokenAssetBySymbol.json`, JSON.stringify(Array.from(result.entries())), (err) => {
        if (err) throw err;
        console.log('tokenAssetBySymbol.json complete');
    })
}

function saveMapTokenAssetByAddressAsJsonFile(tokens: Token[]) {
    const result = new Map<string, TokenPngUrl>()

    for (const token of tokens) {
        result.set(token.address, token.logoURI);
    }

    fs.writeFile(`${new Date().getMilliseconds()}tokenAssetByAddress.json`, JSON.stringify(Array.from(result.entries())), (err) => {
        if (err) throw err;
        console.log('tokenAssetByAddress.json complete');
    })

}


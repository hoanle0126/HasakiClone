export function convertVNDToUSD(vnd, rate = 25000) {
    const usd = vnd / rate;
    return usd.toFixed(2); // làm tròn 2 số
}

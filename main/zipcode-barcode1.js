'use strict';
const fixture = require('../spec/fixture.js');

function printBarcode(zipCode) {
    const formatZipCode = checkZipCode(zipCode);
    if (formatZipCode === false) {
        console.log("非法邮编");
        return;
    }
    const checkCodes = buildCodesCheckBit(formatZipCode);
    const barcode = buildBarcode(checkCodes);

    console.log(barcode);
}

function checkZipCode(zipCode) {

    const formatZipCode = zipCode.replace(/-/g, '');
    const length = formatZipCode.length;

    return length === 5 || length === 9 && isNaN(parseInt(formatZipCode)) === true ? formatZipCode : false;
}

function buildCodesCheckBit(formatZipCode) {
    const checkCodes = formatZipCode.split('');
    const checkBit = checkCodes.map(checkCode=>parseInt(checkCode)).reduce((pre, cur)=>pre + cur) % 10;
    if (checkBit === 0) {
        checkCodes.push('0');
    } else {
        checkCodes.push((10 - checkBit).toString());
    }

    return checkCodes;
}

function buildBarcode(checkCodes) {
    const allBarcodes = fixture.loadBarcode();
    const barcodeArray = [];
    for (let checkCode of checkCodes) {
        const barcodeSelected = allBarcodes.find(allBarcode=>allBarcode.digit === checkCode);
        barcodeArray.push(barcodeSelected.digitBarcode);
    }

    return `|${barcodeArray.join('')}|`;
};

module.exports = {
    checkZipCode: checkZipCode,
    buildCodesCheckBit: buildCodesCheckBit,
    buildBarcode: buildBarcode,
    printBarcode: printBarcode
};
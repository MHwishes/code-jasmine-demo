'use strict';
const fixture = require('../spec/fixture.js');

function zipCodeToBarcode(zipCode) {
    if (!validateZipCode(zipCode)) {
        return {success: false, error: 'invalid_zipcode'}
    }
    const zipCodeWithoutDash = formatZipCode(zipCode);
    const zipcodeInDigitArray = toDigitArray(zipCodeWithoutDash);
    const checkDigit = calculateCheckDigit(zipcodeInDigitArray);
    const barcode = toBarcode(zipcodeInDigitArray.concat(checkDigit));
    const value = formatBarcode(barcode);
    return {success: true, value};
}

function validateZipCode(zipCode){

    return /^\d{5}$/.test(zipCode)
        || /^\d{9}$/.test(zipCode)
        || /^\d{5}-\d{4}/.test(zipCode);
}


function formatZipCode(zipCode) {

    return zipCode.replace('-','');
}

function toDigitArray(zipCodeWithoutDash) {
    return zipCodeWithoutDash.split('').map(c=>parseInt(c));
}

function calculateCheckDigit(zipCodeInDigitArray) {

    return (10-sum(zipCodeInDigitArray)%10)%10;
}
function sum(digts) {

    return digts.reduce((a,b)=>a+b);
}

function toBarcode(zipCode){

    return zipCode.map(i=>fixture.table[i]).join('');
}

function formatBarcode(barcode) {

    return `|${barcode}|`;
}

module.exports={zipCodeToBarcode:zipCodeToBarcode,
    validateZipCode:validateZipCode,
    formatZipCode:formatZipCode,
    toDigitArray:toDigitArray,
    calculateCheckDigit:calculateCheckDigit,
    toBarcode:toBarcode,
    formatBarcode:formatBarcode
};
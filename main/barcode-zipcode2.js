'use strict';
const fixture = require('../spec/fixture.js');

function barcodeToZipcode(barcode) {
    if (!validateBarcode(barcode)) {
        return {success: false, error: 'invalid_barcode'};
    }
    const barcodeWithoutBorder = removeBorder(barcode);

    const digits = barcodeToDigits(barcodeWithoutBorder);

    if (!valiateCheckdigits(digits)) {
        return {success: false, error: 'check_digit_not_match'};
    }
    const zipCode = toZip(digits);

    const formattedZipCode = align(zipCode);

    return {success: true, value: formattedZipCode};
}

function validateBarcode(barcode) {

    const length = barcode.length;

    return barcode.match(/^\|[:|]+\|$/) && [32, 52].some(i=>i === length);
}

function removeBorder(barcode) {
    return barcode.slice(1, -1);
}

function barcodeToDigits(barcodeWithoutBorder) {

    return barcodeWithoutBorder.match(/.{1,5}/g).map(str=>fixture.table.indexOf(str));
}

function valiateCheckdigits(digits) {

    return sum(digits) % 10 === 0;
}


function sum(digits) {
    return digits.reduce((a, b)=>a + b);
}


function toZip(digits) {
    return digits.join('').slice(0, -1);
}

function align(zipCode) {
    if (zipCode.length === 9) {
        return `${zipCode.slice(0, 5)}-${zipCode.slice(5)}`
    }
    return zipCode;
}

module.exports = {
    barcodeToZipcode: barcodeToZipcode,
    validateBarcode: validateBarcode,
    removeBorder: removeBorder,
    barcodeToDigits: barcodeToDigits,
    valiateCheckdigits: valiateCheckdigits,
    toZip: toZip,
    align: align
};
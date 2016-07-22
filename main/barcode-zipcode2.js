'use strict';
const  fixture=require('../spec/fixture.js');
function printZipCodes(barcodes) {
    const isBarcode = checkBarcode(barcodes);

    if (isBarcode === false) {
        console.log('不能转换编码');
        return;
    }
    const barcodeArray = buildBarcodeSplit(barcodes);
    const codeArray = buildCodeCheck(barcodeArray);

    if (codeArray === false) {
        console.log('不能转换编码');
        return;
    }
    const zipCode = buildZipCode(codeArray);

    console.log(zipCode);
}

function checkBarcode(barcodes) {
    if (barcodes.length === 32 || barcodes.length === 52) {
        const arrayBarcodes = barcodes.split('');
        for (let arrayBarcode of arrayBarcodes) {
            if (arrayBarcode != ':' && arrayBarcode != '|') {
                return false;
            }
        }

        return barcodes;
    }
    else {

        return false;
    }
}

function buildBarcodeSplit(barcodes) {
    const barcodeSplitedArray = [];

    const newBarcodes = barcodes.substring(1, barcodes.length - 1);

    for(let index=0;index<newBarcodes.length;index+=5){
        barcodeSplitedArray.push(newBarcodes.substring(index,index+5));
    }
    
    return barcodeSplitedArray;
}


function buildCodeCheck(barcodeArray) {
    const allBarcodes = fixture.loadBarcode();
    const codeArray = [];
    for (let barcode of barcodeArray) {
        const barcodeSelected = allBarcodes.find(allBarcode=>allBarcode.digitBarcode === barcode);
        codeArray.push(barcodeSelected.digit);
    }
    const rightCode = (codeArray.map(code=>parseInt(code)).reduce((pre, nex)=>pre + nex)) % 10;
    return rightCode === 0 ? codeArray : false;
}



function buildZipCode(codeArray) {
    const newZipCode = codeArray.map(code=>parseInt(code)).join('').toString();
    const zipCode = newZipCode.substring(0, newZipCode.length - 1);
    if (zipCode.length === 5) {
        return zipCode;
    } else {
        return `${zipCode.substring(0, 5)}-${zipCode.substring(5)}`;
    }
}

module.exports = {
    checkBarcode: checkBarcode,
    buildBarcodeSplit: buildBarcodeSplit,
    buildCodeCheck: buildCodeCheck,
    buildZipCode: buildZipCode,
    printZipCodes: printZipCodes
};
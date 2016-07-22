'use strict';
function prinZipCodes(barcodes) {
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
    const barcodeArray = [];
    const newBarcodes = barcodes.substring(1, barcodes.length - 1);
    let start = 0;
    while (start < newBarcodes.length - 1) {
        barcodeArray.push(newBarcodes.substring(start, start + 5));
        start += 5;
    }
    return barcodeArray;
}


function buildCodeCheck(barcodeArray) {
    const allBarcodes = loadBarcode();
    const codeArray = [];
    for (let barcode of barcodeArray) {
        const barcodeSelected = allBarcodes.find(allBarcode=>allBarcode.digitBarcode === barcode);
        codeArray.push(barcodeSelected.digit);
    }
    const rightCode = (codeArray.map(code=>parseInt(code)).reduce((pre, nex)=>pre + nex)) % 10;
    if (rightCode === 0) {
        return codeArray;
    }
    else {
        return false;
    }
}

function buildZipCode(codeArray) {
    const newZipCode = codeArray.map(code=>parseInt(code)).join('').toString();
    const zipCode = newZipCode.substring(0, newZipCode.length - 1);
    if (zipCode.length === 5) {
        return zipCode;
    } else {
        return zipCode.substring(0, 5) + '-' + zipCode.substring(5);
    }
}

function loadBarcode() {
    return [{
        digit: '1',
        digitBarcode: ':::||'
    }, {
        digit: '2',
        digitBarcode: '::|:|'
    },
        {
            digit: '3',
            digitBarcode: '::||:'
        },
        {
            digit: '4',
            digitBarcode: ':|::|'
        },
        {
            digit: '5',
            digitBarcode: ':|:|:'
        },
        {
            digit: '6',
            digitBarcode: '::||:'
        },
        {
            digit: '7',
            digitBarcode: '|:::|'
        }, {
            digit: '8',
            digitBarcode: '|::|:'
        },
        {
            digit: '9',
            digitBarcode: '|:|::'
        },
        {
            digit: '0',
            digitBarcode: '||:::'
        }
    ];
}

module.exports = {
    checkBarcode: checkBarcode,
    buildBarcodeSplit: buildBarcodeSplit,
    buildCodeCheck: buildCodeCheck,
    buildZipCode: buildZipCode,
    prinZipCodes:prinZipCodes
};
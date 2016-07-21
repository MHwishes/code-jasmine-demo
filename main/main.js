'use strict';
function printBarcode(zipCode) {
    const formatZipCode = checkZipCode(zipCode);
    if (formatZipCode === false) {
        console.log("非法邮编");
        return;
    }
    else {
        const checkCodes = buildCodesCheckBit(formatZipCode);
        const barcode = buildBarcode(checkCodes);
        console.log(barcode);
    }
}

function checkZipCode(zipCode) {

    const formatZipCode = zipCode.replace(/-/g, '');
    if (formatZipCode.length === 5 || formatZipCode === 9 && parseInt(formatZipCode) === number) {
        return formatZipCode;
    }
    else {
        return false;
    }
}

function buildCodesCheckBit(formatZipCode) {
    const checkCodes = formatZipCode.split('');

    checkCodes.push((10 - (checkCodes.map(checkCode=>parseInt(checkCode)).reduce((pre, cur)=>pre + cur) % 10)).toString());

    return checkCodes;
}

function buildBarcode(checkCodes) {
    const allBarcodes = loadBarcode();
    const barcodeArray = [];
    for (let checkCode of checkCodes) {
        const barcodeSelected = allBarcodes.find(allBarcode=>allBarcode.digit === checkCode);
        barcodeArray.push(barcodeSelected.digitBarcode);
    }
    return '|' + barcodeArray.join('') + '|';
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
        },
        {
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
    checkZipCode: checkZipCode,
    buildCodesCheckBit: buildCodesCheckBit,
    buildBarcode: buildBarcode,
    printBarcode:printBarcode

};
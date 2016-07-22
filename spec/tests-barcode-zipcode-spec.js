'use strict';
const main=require('../main/barcode-zipcode.js');
describe('printBarcode', () => {

    let correctBarcodes;
    let wrongBarcodes;

    beforeEach(() => {
        correctBarcodes = '||:|:::|:|:|:::|:::||::||::|:|:|';
        wrongBarcodes = '||:|:::|:';
    });

    it('printBarcode', () => {

        spyOn(console, 'log');

        main.prinZipCodes(correctBarcodes);

        const expectNumber = '95713';

        expect(console.log).toHaveBeenCalledWith(expectNumber);
    });

    it('printBarcode', () => {

        spyOn(console, 'log');
        main.prinZipCodes(wrongBarcodes);
        const expectNumber = '不能转换编码';

        expect(console.log).toHaveBeenCalledWith(expectNumber);
    });


    it('should get correct zipCodes', () => {

        const result=main.checkBarcode(correctBarcodes);
        expect(result).toEqual('||:|:::|:|:|:::|:::||::||::|:|:|');
    });

    it('should get wrong information', () => {

        const result= main.checkBarcode(wrongBarcodes);
        expect(result).toEqual(false);
    });

    it('buildBarcodeSplit', () => {

        const result= main.buildBarcodeSplit('||:|:::|:|:|:::|:::||::||::|:|:|');
        
        expect(result).toEqual(['|:|::',':|:|:','|:::|',':::||','::||:',':|:|:']);
    });

    it('buildCodeCheck-crectcode', () => {

        const result= main.buildCodeCheck(['|:|::',':|:|:','|:::|',':::||','::||:',':|:|:']);

        expect(result).toEqual(['9','5','7','1','3','5']);
    });

    it('buildCodeCheck-wrongcode', () => {

        const result= main.buildCodeCheck(['|:|::',':|:|:','|:::|',':::||',':::||',':|:|:']);

        expect(result).toEqual(false);
    });
    
    it('buildZipCode',()=>{
        const zipCode=main.buildZipCode(['9','5','7','1','3','5']);
        expect(zipCode).toEqual('95713');
    });
    it('buildZipCode',()=>{
        const zipCode=main.buildZipCode(['4','5','0','5','6','1','2','3','4','0']);
        expect(zipCode).toEqual('45056-1234');
    })
    
});
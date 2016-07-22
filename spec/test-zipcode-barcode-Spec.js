'use strict';
const main=require('../main/zipcode-barcode1.js');

describe('printBarcode', () => {

    let correctZipCodes;
    let wrongZipCodes;

    beforeEach(() => {
       correctZipCodes='95713';
        wrongZipCodes='957';
    });
    
    it('printBarcode', () => {

        spyOn(console, 'log');

        main.printBarcode(correctZipCodes);

        const expectNumber ='||:|:::|:|:|:::|:::||::||::|:|:|';

        expect(console.log).toHaveBeenCalledWith(expectNumber);
    });

    it('printBarcode', () => {

        spyOn(console, 'log');

        main.printBarcode(wrongZipCodes);

        const expectNumber ='非法邮编';

        expect(console.log).toHaveBeenCalledWith(expectNumber);
    });

    
    it('should get correct zipCodes', () => {
        
        const result=main.checkZipCode(correctZipCodes);
        expect(result).toEqual('95713');
    });

    it('should get wrong information', () => {

        const result= main.checkZipCode(wrongZipCodes);
        expect(result).toEqual(false);
    });

    it('buildCodesCheckBit', () => {
        const checkCodes= main.buildCodesCheckBit('95713');
        expect(checkCodes).toEqual(['9', '5', '7', '1', '3', '5' ]);
    });

    it('buildBarcode',()=>{
      //  const digitBarcode=fixture.loadBarcode();
        const expectBarcode='||:|:::|:|:|:::|:::||::||::|:|:|';
        const barcode=main.buildBarcode(['9', '5', '7', '1', '3', '5' ]);
        expect(expectBarcode).toEqual(barcode);
    });
});
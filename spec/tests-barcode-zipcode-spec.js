'use strict';
const main = require('../main/barcode-zipcode2.js');

describe('barcodeToZipcode', ()=> {
    it('should translate barcode to zipcode', () => {
        [
            {
                zipcode: '45056-1234',
                barcode: '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|'
            },
            {
                zipcode: '45056-1234',
                barcode: '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|'
            },
            {
                zipcode: '45056',
                barcode: '|:|::|:|:|:||::::|:|::||::||:::|'
            }
        ].forEach((example) => {
            const result = main.barcodeToZipcode(example.barcode);
            expect(result.success).toBeTruthy();
            expect(result.value).toEqual(example.zipcode);
        });
    });

    it('should validate barcode format', () => {
        [':|::|:|:|:||::::|:|::||::||:::'].forEach((barcode) => {
            const result = main.barcodeToZipcode(barcode);
            expect(result.success).toBeFalsy();
            expect(result.error).toBe('invalid_barcode');
        });
    });

    it('should validate zipcode by check digit', () => {
        const result = main.barcodeToZipcode('|:|::|:|:|:||::::|:|::||:::::|||');
        expect(result.success).toBeFalsy();
        expect(result.error).toBe('check_digit_not_match');
    });

});

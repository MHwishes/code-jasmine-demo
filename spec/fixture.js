'use strict';
 function loadBarcode() {

     return [
         {
             digit: '1',
             digitBarcode: ':::||'
         },
         {
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

module.exports={loadBarcode:loadBarcode};
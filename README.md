## zipcode-barcode1:邮编到条形码的转换
####1.printBarcode为主函数,两种情况:a. input:zipcodes,如:'95713',output:barcodes,如:'||:|:::|:|:|:::|:::||::||::|:|:|';b.input:zipcodes,如:'9513',output:'非法编码'
####2.checkZipCode为检测邮编是否合法,两种情况:a.input:zipcodes,如:'95713',output:checkCodes,如:'95713';b.input:zipcodes,如:'9571',output:false.
####3.buildCodesCheckBit增加校验位,input:zipcodes,如:'95713',output:checkCodes,如:'['9', '5', '7', '1', '3', '5' ]';
####4.buildBarcode转换条形码,input:checkCodes,如:'['9', '5', '7', '1', '3', '5' ]',output:'||:|:::|:|:|:::|:::||::||::|:|:|';
###时间估计:
####1.printBarcode预测5min,实际6min;
####2.checkZipCode预测20min,实际40min;
####3.buildCodesCheckBit预测20min,实际18min;
####4.buildBarcode预测30min,实际为:47min;

##barcode-zipcode2:条码到邮编的转换
####1.prinZipCodes为主函数,两种情况:a. input:barcodes,如:'||:|:::|:|:|:::|:::||::||::|:|:|',output:zipcodes,如:'95713';b.input:barcodes,如:':|:|:::|:::|',output:'不能转换'
####2.checkBarcode为检测条码是否合法,两种情况:a.input:barcodes,如:'||:|:::|:|:|:::|:::||::||::|:|:|',output:checkBarcode,如:'||:|:::|:|:|:::|:::||::||::|:|:|';b.input:barcodes,如:':::|:|:',output:false.
####3.buildBarcodeSplit为每5位分离,a.input:barcodes,如:'||:|:::|:|:|:::|:::||::||::|:|:|',output:barcodeSplitedArray['|:|::',':|:|:','|:::|',':::||','::||:',':|:|:']
####4.buildCodeCheck转换数字并判断是否合法,两种情况:a.input:barcodeSplitedArray,如:'['|:|::',':|:|:','|:::|',':::||','::||:',':|:|:']',output:checkCodes,如:'['9', '5', '7', '1', '3', '5' ]',b.b.input:barcodeSplitedArray,如:'['|:|::',':|:|:','|:::|',':::||','::||:',':::||']',output:false;
####5.buildBarcode转换邮编,input:,如:'['9','5','7','1','3','5']'或['4','5','0','5','6','1','2','3','4','0'],output:'95731'或'45056-1234';

###时间估计:
####1.prinZipCodes预测5min,实际7min;
####2.checkZipCode预测10min,实际8min;
####3.buildBarcodeSplit预测15min,实际30min;
####4.buildCodeCheck预测8min,实际为:7min;
####5.buildBarcode预测10min,实际12min;

####总结:第一个花费时间较多,和实际预测时间相差大,主要是因为写着写着发现原来某些想法行不同,于是重新换思路来;
第二个相比第一个花费时间少,只要是在第一个的基础上,解决子问题思路和实现教容易.


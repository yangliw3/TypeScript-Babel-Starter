let str1: string = "enum AssetStatus";
let str2: string = "	Normal,			//0：正常";
let str3: string = "	Unknown = 99,	//99：未知(哈哈)";
let str4: string = "	Suspended,  	//3：停用(备案)";
let str5: string = "	Voucher,	//凭证文档";

// group[1] 就是枚举名字
const enumNamePat = new RegExp("^enum[ \t]+([a-zA-Z0-9_]+)[ \t]*$");
const enumStartPat = new RegExp("^[ \t]*\{[ \t]*$");
const enumEndPat = new RegExp("^[ \t]*\}[ \t]*$");
// group[1]  字面量
// group[2]  值
// group[3]  描述
const enumItemPat = /^[ \t]*([a-zA-Z0-9]+)(?:[ \t]*=[ \t]*("?\w+"?))?,[ \t]*\/\/(?:(?:\d+)[：:])?[ ]*([^\(\)]+)(?:\([^\(\)]*\))?.*$/;

let ret =  enumNamePat.exec(str1) as any;
let ret2 = enumStartPat.exec(" ss  {   ") as any;
let ret3 = enumItemPat.exec(str5) as any;

console.log(ret && ret[1]);
console.log(ret2 && ret2[0]);
console.log(ret3[1]);
console.log(ret3[3]);

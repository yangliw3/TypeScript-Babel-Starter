import process from "process";
import path from "path";
import fs, { appendFile } from "fs";
import readline from "readline";

// group[1] 就是枚举名字
const ENUM_NAME_PAT = new RegExp("^enum[ \t]+([a-zA-Z0-9_]+)[ \t]*$");
const ENUM_START_PAT = new RegExp("^[ \t]*\{[ \t]*$");
const ENUM_END_PAT = new RegExp("^[ \t]*\}[ \t]*$");
// group[1]  字面量
// group[2]  值
// group[3]  描述
// const ENUM_ITEM_PAT = /^[ \t]*([a-zA-Z0-9]+)(?:[ \t]*=[ \t]*("?\w+"?))?,[ \t]*\/\/(?:(?:\d+)[：:])?[ ]*([^\(\)（）]+)(?:(?:\(|（)[^\(\)（）]*(\)|）)?.*$/;
// const ENUM_ITEM_PAT = /^\s*([a-zA-Z0-9]+)(?:\s*=\s*("?\w+"?))?\s*,\s*\/\/(?:\d+[:：]?)?\s*([^\(\)（）]*)(.*)$/;
const ENUM_ITEM_PAT = /^\s*([a-zA-Z0-9]+)(?:\s*=\s*("?\w+"?))?\s*,\s*\/\/(?:\d+[:：])?\s*([^\(\)（）]*)(.*)$/;


// 枚举的一项
interface IEnumItem {
    literal?: string | number;
    value?: string | number;
    desc?: string;
}

// 描述枚举
interface IEnum {
    name?: string;
    body?: IEnumItem[];
}

// 类型 编译器构造参数
interface IEnumCompilerOptions {
    fileNameEnumMd?: string;
    fileNameOutput?: string;
    importPathPrefix?: string;
}

function firstCharLowerCase(str: string): string {
    return str.slice(0, 1).toLowerCase() + str.slice(1);
}

function getWriteFileStream(filename: string) {
    return fs.createWriteStream(filename, {
        flags: "w",
        encoding: "utf-8",
        autoClose: true
    });
}

function writeFileUseArr(fileName: string, content: string[]) {
    const writeFileStream = getWriteFileStream(fileName);
    writeFileStream.write(content.join("\n"));
    writeFileStream.close();
}

function writeEnumsToTinyFile(enums: IEnum[]): void {
    enums.forEach((enumSelf, index) => {
        const enumName = enumSelf.name as string;
        const enumItems = enumSelf.body as IEnumItem[];
        let lines = [];
        let enumCNDictLines = [];
        
        lines.push(`import { type } from "os";`);
        lines.push(`import { IEnumCNDict } from "@/costom-types/advanced-types";`);
        lines.push(``);  // 写一个空行
        lines.push(`enum ${enumName} {`)


        enumCNDictLines.push(`export const ${firstCharLowerCase(enumName)}CNDict: IEnumCNDict<${enumName}> = {`);

        enumItems.forEach(enumItem => {
            if (!enumItem.value) {
                lines.push(`    ${enumItem.literal},  // ${enumItem.desc}`);
            } else {
                lines.push(`    ${enumItem.literal} = ${enumItem.value},  // ${enumItem.desc}`);
            }

            enumCNDictLines.push(`    [${enumName}.${enumItem.literal}]: "${enumItem.desc}",`);

        });
        lines.push(`};`)
        enumCNDictLines.push(`};`);

        lines.push("");
        lines = lines.concat(enumCNDictLines);

        // 把数组写入文件
        writeFileUseArr(
            path.join(optionsReal.fileNameOutput as string,
                "enum",
                firstCharLowerCase(enumName) + ".ts"),
            lines);
    })
}

// 把枚举数组 当成 数组写入文件
function writeEnumNamesToFile(enumNames: string[]): void {
    let lines: string[] = [];
    const fileName: string = path.join(optionsReal.fileNameOutput as string, "vuePlugin.ts");

    lines.push(`const enumsFamilyArr = [`);
    enumNames.forEach(enumName => {
        lines.push(`    "${enumName}",`);
    });
    lines.push(`];`);

    writeFileUseArr(fileName, lines);
}

// 变量
const CWD = process.cwd();
const optionsDefault: IEnumCompilerOptions = {
    importPathPrefix: "@/model/enum/",
    fileNameEnumMd: path.join(CWD, "/data/input/fenest.tables.md"),
    fileNameOutput: path.join(CWD, "/data/output/")
};
let optionsReal: IEnumCompilerOptions = {};
let rl: readline.Interface;

// 函数
export function EnumCompilerFunc(options: IEnumCompilerOptions = {}) {

    let isEnumInner: boolean = false;
    let enumNames: string[] = [];
    let enums: IEnum[] = [];

    let enumSelf: IEnum = {};
    let enumItems: IEnumItem[] = []

    optionsReal = Object.assign({}, optionsDefault, options);
    console.log(optionsReal);
    rl = readline.createInterface({
        input: fs.createReadStream(optionsReal.fileNameEnumMd as string, {
            flags: "r",
            encoding: "utf-8",
        }),
        crlfDelay: Infinity
    });

    rl.on("line", (line) => {
        console.log(`11 ${line}`);
        let currentEnum: IEnum = {};
        let currentEnumItems: IEnumItem[] = [];

        if (!isEnumInner && !enumSelf.name) {
            // 在enum外面， 开始查找enum 的名字
            const ret = ENUM_NAME_PAT.exec(line);
            if(ret) {
                enumSelf.name = ret[1];
            }
            return;
        }

        if (!isEnumInner && enumSelf.name) {
            // 在外面， 且已经有名字， 开始查找枚举body开始的地方
            if(ENUM_START_PAT.exec(line)){
                isEnumInner = true;
            };
            return;
        }

        if (isEnumInner) {
            // 在枚举内部， 开始查找每一个 枚举项

            // 先判断改行是否是结束
            if(!ENUM_END_PAT.exec(line)) {
                // 不是结束， 那就判断是否是一项
                const ret = ENUM_ITEM_PAT.exec(line);
                if(ret) {
                    enumItems.push({
                        literal: ret[1],
                        value: ret[2],
                        desc: ret[3]
                    })
                }
            } else {
                // 枚举结束
                enumSelf.body = enumItems;  // 把 当前枚举项 放到 当前枚举 当中
                enums.push(enumSelf);  // 把 枚举 放入枚举集合中
                enumNames.push(enumSelf.name as string);  // 把当前枚举名字 放入数组中

                enumSelf = {};
                enumItems = [];
                isEnumInner = false;  // 跳出枚举， 下一次开始寻找下一个枚举

            }

            return;
        }

        
    });

    rl.on("close", () => {
        writeEnumsToTinyFile(enums);
        writeEnumNamesToFile(enumNames);
        console.log(`处理完毕了`);
        console.log(enums);
    });

    writeFileUseArr(
        path.join(optionsReal.fileNameOutput as string, "ret.txt"),
        ["11","22","33"]);
    
}




// export class EnumCompiler {

//     private rl: readline.Interface;

//     // 内置默认options
//     public CWD = process.cwd();
//     public options: IEnumCompilerOptions = {
//         importPathPrefix: "@/model/enum/",
//         fileNameEnumMd: path.join(this.CWD, "/data/input/fenest.tables.md"),
//         fileNameOutput: path.join(this.CWD, "/data/output/")
//     };

//     private init() {
//         this.rl = readline.createInterface({
//             input: fs.createReadStream(this.options.fileNameEnumMd as string, {
//                 flags: "r",
//                 encoding: "utf-8",
//             }),
//             crlfDelay: Infinity
//         })
//     }
    

//     public constructor(options: IEnumCompilerOptions = {}){
//         this.options = Object.assign({}, this.options, options);
//         this.init();
//     }

//     public testReadAndWrite() {
//         console.log(`==========================`);
//         console.log(this.CWD);
//         console.log(this.options);
//     }

// }
import fs from "fs";
import readline from "readline"
import path from "path";
import process from "process";

import { EnumCompilerFunc } from "./EnumCompiler";

console.log(`111111111`);
console.log(__dirname);  // 代码存放 路径
const CWD = process.cwd();  // 程序运行 路径
console.log(CWD);
// const filePath = path.join(CWD, "/test/1.json");
// const filePathFroWrite = path.join(CWD, "/test/resut.json");


// function demoReadAndWriteFile() {
//     const rl = readline.createInterface({
//         input: fs.createReadStream(filePath,{
//             flags: "r",
//             encoding: "utf-8",
//         }),
//         crlfDelay: Infinity
//     });

//     rl.on("line", (line) => {
//         console.log(`11: ` + line);
//         fileWriteStream.write(`11: ` + line + `\n`);
//     });

//     rl.on("close", () => {
//         console.log(`文件读取完成， 处理完毕`);
//     })

//     const fileWriteStream = fs.createWriteStream(filePathFroWrite, {
//         flags: "w",
//         encoding: "utf-8",
//         autoClose: true
//     })

// }
// demoReadAndWriteFile();

EnumCompilerFunc();


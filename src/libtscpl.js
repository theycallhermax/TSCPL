"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compile = void 0;
const fs = __importStar(require("fs"));
function callback() {
    return;
}
/**
* Compiles a ACPL file
*
* @param file The ACPL file to compile
* @param output_file_name The name of the output file
*/
function compile(file, output_file_name) {
    let file_split = fs.readFileSync(file, "utf-8").split("\n");
    let variables = [];
    let functions = [];
    let is_module = false;
    let imports = [];
    fs.writeFileSync(output_file_name, "");
    if (file_split[0] === "module") {
        is_module = true;
    }
    for (let i in file_split) {
        if (file_split[i].split(" ")[0] === "exit") {
            fs.appendFile(output_file_name, `import {exit} from "process";\n`, callback);
            break;
        }
    }
    for (let i in file_split) {
        if (file_split[i].split(" ")[0] === "import") {
            let import_file = fs.readFileSync(file_split[i].split(" ")[1], "utf-8").split("\n");
            for (let j in import_file) {
                if (import_file[j].split(" ")[0] === "func") {
                    functions.push(import_file[j].split(" ")[1]);
                    imports.push(import_file[j].split(" ")[1]);
                }
            }
        }
    }
    for (let i in file_split) {
        if (file_split[i].split(" ")[0] === "outln") {
            fs.appendFile(output_file_name, `console.log(${file_split[i].split(" ").slice(1, file_split[i].split(" ").length).join(" ")});\n`, callback);
            continue;
        }
        else if (file_split[i].split(" ")[0] === "str") {
            if (file_split[i].split(" ")[2] === undefined) {
                variables.push(file_split[i].split(" ")[1]);
                fs.appendFile(output_file_name, `let ${file_split[i].split(" ")[1]}: string;\n`, callback);
            }
            else {
                variables.push(file_split[i].split(" ")[1]);
                fs.appendFile(output_file_name, `let ${file_split[i].split(" ")[1]}: string = ${file_split[i].split(" ").slice(2, file_split[i].split(" ").length).join(" ")};\n`, callback);
            }
            continue;
        }
        else if (file_split[i].split(" ")[0] === "int" || file_split[i].split(" ")[0] === "dec") {
            if (file_split[i].split(" ")[2] === undefined) {
                variables.push(file_split[i].split(" ")[1]);
                fs.appendFile(output_file_name, `let ${file_split[i].split(" ")[1]}: number;\n`, callback);
            }
            else {
                variables.push(file_split[i].split(" ")[1]);
                fs.appendFile(output_file_name, `let ${file_split[i].split(" ")[1]}: number = ${file_split[i].split(" ").slice(2, file_split[i].split(" ").length).join(" ")};\n`, callback);
            }
            continue;
        }
        else if (file_split[i].split("")[0] === "#" || file_split[i] === "" || file_split[i] === "module") {
            continue;
        }
        else if (file_split[i].split(" ")[0] === "outs" || file_split[i].split(" ")[0] === "outi") {
            if (!(variables.includes(file_split[i].split(" ")[1]))) {
                throw `Tried to print a undefined variable at line ${parseInt(i) + 1}`;
            }
            fs.appendFile(output_file_name, `console.log(${file_split[i].split(" ")[1]});\n`, callback);
            continue;
        }
        else if (file_split[i].split(" ")[0] === "func") {
            functions.push(file_split[i].split(" ")[1]);
            for (let j in file_split[i].split(" ").slice(2, file_split[i].split(" ").length)) {
                variables.push(file_split[i].split(" ").slice(2, file_split[i].split(" ").length)[j]);
            }
            if (is_module) {
                if (file_split[i].split(" ")[1].startsWith("_")) {
                    fs.appendFile(output_file_name, `function ${file_split[i].split(" ")[1]}(${file_split[i].split(" ").slice(2, file_split[i].split(" ").length).join(": any, ")}: any)`, callback);
                }
                else {
                    fs.appendFile(output_file_name, `export function ${file_split[i].split(" ")[1]}(${file_split[i].split(" ").slice(2, file_split[i].split(" ").length).join(": any, ")}: any)`, callback);
                }
            }
            else {
                fs.appendFile(output_file_name, `function ${file_split[i].split(" ")[1]}(${file_split[i].split(" ").slice(2, file_split[i].split(" ").length).join(": any, ")}: any)`, callback);
            }
            continue;
        }
        else if (file_split[i].split(" ")[0] === ":") {
            fs.appendFile(output_file_name, ` {\n`, callback);
            continue;
        }
        else if (file_split[i].split(" ")[0] === ";") {
            fs.appendFile(output_file_name, `}\n`, callback);
            continue;
        }
        else if (file_split[i].split(" ")[0] === "import") {
            compile(file_split[i].split(" ")[1], `${file_split[i].split(" ")[1].split(".acpl")[0]}.ts`);
            fs.appendFile(output_file_name, `import {${imports.join(", ")}} from "./${file_split[i].split(" ")[1].split(".acpl")[0]}";\n`, callback);
            continue;
        }
        else if (file_split[i].split(" ")[0] === "on") {
            let args = file_split[i].split(" ").slice(1, file_split[i].split(" ").length);
            for (let j in args) {
                if (args[j] === "=") {
                    args[j] = "==";
                }
                else if (args[j] === "==") {
                    args[j] = "===";
                }
            }
            fs.appendFile(output_file_name, `if (${args.join(" ")})`, callback);
            continue;
        }
        else if (file_split[i].split(" ")[0] === "or") {
            let args = file_split[i].split(" ").slice(1, file_split[i].split(" ").length);
            for (let j in args) {
                if (args[j] === "=") {
                    args[j] = "==";
                }
                else if (args[j] === "==") {
                    args[j] = "===";
                }
            }
            fs.appendFile(output_file_name, `else if (${args.join(" ")})`, callback);
            continue;
        }
        else if (file_split[i].split(" ")[0] === "!on") {
            fs.appendFile(output_file_name, "else", callback);
            continue;
        }
        else if (file_split[i].split(" ")[0] === "exit") {
            fs.appendFile(output_file_name, `exit(${file_split[i].split(" ")[1]});\n`, callback);
            continue;
        }
        else {
            if (functions.includes(file_split[i].split(" ")[0])) {
                fs.appendFile(output_file_name, `${file_split[i].split(" ")[0]}(${file_split[i].split(" ").slice(1, file_split[i].split(" ").length).join(" ")});\n`, callback);
                continue;
            }
            else if (variables.includes(file_split[i].split(" ")[0]) && file_split[i].split(" ")[1]) {
                fs.appendFile(output_file_name, `${file_split[i].split(" ")[0]} = ${file_split[i].split(" ")[1]};\n`, callback);
                continue;
            }
            else {
                throw `Invalid statement at line ${parseInt(i) + 1}`;
            }
        }
    }
}
exports.compile = compile;
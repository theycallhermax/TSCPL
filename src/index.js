#!/usr/bin/env node
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const yargs = __importStar(require("yargs"));
const chalk_1 = __importDefault(require("chalk"));
const process_1 = require("process");
const child_process_1 = require("child_process");
const libtscpl_1 = require("./libtscpl");
console.log(chalk_1.default.hex("#0077ff").bold("TSCPL v1.2.3"));
if (yargs.argv._[0] === undefined) {
    console.log(chalk_1.default.whiteBright("TSCPL is a compiler inspired by ACPL powered by libtscpl. It's goal is to provide a ACPL compiler written in TypeScript."));
    console.log("");
    console.log(chalk_1.default.whiteBright(`To learn more, see ${chalk_1.default.blue.bold("https://github.com/mdwalters/TSCPL#readme")}`));
    console.log(chalk_1.default.whiteBright(`To learn more about libtscpl, see ${chalk_1.default.blue.bold("https://github.com/mdwalters/TSCPL#libtscpl")}`));
    console.log(chalk_1.default.whiteBright(`To learn ACPL, see ${chalk_1.default.blue.bold("https://hackmd.io/@mdwalters/acpl")}`));
    (0, process_1.exit)(0);
}
let output_file = (yargs.argv.output ? yargs.argv.output : `${yargs.argv._[0].split(".acpl")[0]}.ts`);
console.log(chalk_1.default.yellow(`Compiling ${chalk_1.default.yellowBright.bold(yargs.argv["_"][0])}...`));
try {
    (0, libtscpl_1.compile)(yargs.argv._[0], output_file);
}
catch (e) {
    console.log(chalk_1.default.red(`${e} of ${chalk_1.default.red.bold(yargs.argv._[0])}`));
    console.error(chalk_1.default.red(`Unsuccessfully compiled ${chalk_1.default.red.bold(yargs.argv._[0])}.`));
    (0, process_1.exit)(1);
}
console.log(chalk_1.default.green(`Successfully compiled ${chalk_1.default.greenBright.bold(yargs.argv._[0])} as ${chalk_1.default.greenBright.bold(`${output_file}`)}.`));
if (yargs.argv.run === true) {
    console.log(chalk_1.default.yellow(`Running ${chalk_1.default.yellowBright.bold(`${output_file}`)}...`));
    (0, child_process_1.exec)(`npx ts-node ${output_file}`, (error, stdout, stderr) => {
        if (error) {
            console.error(error);
            (0, process_1.exit)(1);
        }
        console.log(stdout);
        console.error(stderr);
    });
}

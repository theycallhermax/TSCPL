#!/usr/bin/env -S npx ts-node
// @ts-nocheck
import * as yargs from "yargs";
import * as fs from "fs";
import chalk from "chalk";
import { exit } from "process";
import { exec } from "child_process";
import { compile } from "./libtscpl";

console.log(chalk.hex("#0077ff").bold("TSCPL v1.1.1"));

function appendFileCallback(err): void {
    if (err) {
      console.error(chalk.redBright(err));
      console.error(chalk.redBright(`Unsuccessfully compiled ${chalk.redBright.bold(yargs.argv._[0])}.`));
      exit(1);
    }
}

if (yargs.argv._[0] === undefined) {
    console.log(chalk.whiteBright("TSCPL is a compiler inspired by ACPL. It's goal is to provide a ACPL compiler written in TypeScript."));
    console.log(chalk.whiteBright(`To learn more, see ${chalk.blueBright.bold("https://github.com/mdwalters/TSCPL#readme")}`));
    exit(0);
}

let file: string[] = fs.readFileSync(yargs.argv._[0], "utf-8").split("\n");

console.log(chalk.yellowBright(`Compiling ${chalk.yellowBright.bold(yargs.argv["_"][0])}...`));
fs.writeFileSync(`${yargs.argv._[0]}.ts`, "");

for (let i in file) {
    if (file[i].split(" ")[0] === "outln") {
        fs.appendFile(`${yargs.argv._[0]}.ts`, `console.log(${file[i].split(" ").slice(1, file[i].split(" ").length).join(" ")});\n`, appendFileCallback);
        continue;
    } else if (file[i].split(" ")[0] === "str") {
        fs.appendFile(`${yargs.argv._[0]}.ts`, `let ${file[i].split(" ")[1]}: string = ${file[i].split(" ").slice(2, file[i].split(" ").length).join(" ")};\n`, appendFileCallback);
        continue;
    } else if (file[i].split(" ")[0] === "int") {
        fs.appendFile(`${yargs.argv._[0]}.ts`, `let ${file[i].split(" ")[1]}: number = ${file[i].split(" ").slice(2, file[i].split(" ").length).join(" ")};\n`, appendFileCallback);
        continue;
    } else if (file[i].split("")[0] === "#") {
        fs.appendFile(`${yargs.argv._[0]}.ts`, `//${file[i].split("").slice(1, file[i].split("").length).join("")}\n`, appendFileCallback);
        continue;
    } else if (file[i].split(" ")[0] === "outs") {
        fs.appendFile(`${yargs.argv._[0]}.ts`, `console.log(${file[i].split(" ")[1]});\n`, appendFileCallback);
        continue;
    } else if (file[i] === "") {
        fs.appendFile(`${yargs.argv._[0]}.ts`, "\n", appendFileCallback);
        continue;
    } else {
        console.log(chalk.redBright(`ERROR: Invalid syntax at line ${parseInt(i) + 1} of ${chalk.redBright.bold(yargs.argv._[0])}`));
        console.error(chalk.redBright(`Unsuccessfully compiled ${chalk.redBright.bold(yargs.argv._[0])}.`));
        exit(1);
    }
}

console.log(chalk.greenBright(`Successfully compiled ${chalk.greenBright.bold(yargs.argv._[0])} as ${chalk.greenBright.bold(`${yargs.argv._[0]}.ts`)}.`));
console.log(chalk.yellowBright(`Running ${chalk.yellowBright.bold(`${yargs.argv._[0]}.ts`)}...`));

if (yargs.argv.run === true) {
    exec(`npx ts-node ${yargs.argv._[0]}.ts`, (error, stdout, stderr) => {
        if (error) {
            console.error(error);
            exit(1);
        }

        console.log(stdout);
        console.error(stderr);
    });
}

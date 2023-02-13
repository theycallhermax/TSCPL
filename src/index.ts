#!/usr/bin/env -S npx ts-node
// @ts-nocheck
import * as yargs from "yargs";
import * as fs from "fs";
import chalk from "chalk";
import { exit } from "process";

console.log(chalk.hex("#0077ff").bold("TSCPL v1.0.0"));


if (yargs.argv._[0] === undefined) {
    console.error(chalk.redBright("ERROR: Input file is required"));
    exit(1);
}

let file: string[] = fs.readFileSync(yargs.argv._[0], "utf-8").split("\n");

console.log(chalk.yellowBright(`Compiling ${chalk.yellowBright.bold(yargs.argv["_"][0])}...`));

for (let i in file) {
    if (file[i].split(" ")[0] === "outln") {
        fs.writeFileSync(`${yargs.argv._[0].split(".acpl")}.js`, `console.log(${file[i].split(" ").slice(1, file[i].split(" ").length).join(" ")});\n`);
        continue;
    } else if (file[i].split(" ")[0].startsWith("#")) {
        fs.writeFileSync(`${yargs.argv._[0].split(".acpl")}.js`, `//${file[i].split(" ").slice(1, file[i].split(" ").length).join(" ")}\n`);
        continue;
    }
}

console.log(chalk.greenBright(`Successfully compiled ${chalk.greenBright.bold(yargs.argv._[0])}.`));

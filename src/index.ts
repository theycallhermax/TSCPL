#!/usr/bin/env -S npx ts-node
// @ts-nocheck
import * as yargs from "yargs";
import * as fs from "fs";
import chalk from "chalk";
import { exit } from "process";
import { exec } from "child_process";
import { compile } from "./libtscpl";

console.log(chalk.hex("#0077ff").bold("TSCPL v1.2.0"));

let output_file: string = (yargs.argv.output ? yargs.argv.output : `${yargs.argv._[0].split(".acpl")[0]}.ts`);

if (yargs.argv._[0] === undefined) {
    console.log(chalk.whiteBright("TSCPL is a compiler inspired by ACPL powered by libtscpl. It's goal is to provide a ACPL compiler written in TypeScript."));
    console.log("");
    console.log(chalk.whiteBright(`To learn more, see ${chalk.blue.bold("https://github.com/mdwalters/TSCPL#readme")}`));
    console.log(chalk.whiteBright(`To learn more about libtscpl, see ${chalk.blue.bold("https://github.com/mdwalters/TSCPL#libtscpl")}`));
    console.log(chalk.whiteBright(`To learn ACPL, see ${chalk.blue.bold("https://hackmd.io/Fzlzx3DCRSe2CB4-ABRFcQ")}`));
    exit(0);
}

console.log(chalk.yellowBright(`Compiling ${chalk.yellowBright.bold(yargs.argv["_"][0])}...`));

try {
    compile(yargs.argv._[0], output_file);
} catch(e) {
    console.log(chalk.redBright(`${e} of ${chalk.redBright.bold(yargs.argv._[0])}`));
    console.error(chalk.redBright(`Unsuccessfully compiled ${chalk.redBright.bold(yargs.argv._[0])}.`));
    exit(1);
}

console.log(chalk.greenBright(`Successfully compiled ${chalk.greenBright.bold(yargs.argv._[0])} as ${chalk.greenBright.bold(`${output_file}`)}.`));

if (yargs.argv.run === true) {
    console.log(chalk.yellowBright(`Running ${chalk.yellowBright.bold(`${output_file}`)}...`));
    exec(`npx ts-node ${output_file}`, (error, stdout, stderr) => {
        if (error) {
            console.error(error);
            exit(1);
        }

        console.log(stdout);
        console.error(stderr);
    });
}

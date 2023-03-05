#!/usr/bin/env node
// @ts-nocheck
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import chalk from "chalk";
import { exit } from "process";
import { exec } from "child_process";
import { compile } from "./../lib/libtscpl.js";

const argv: object = yargs(hideBin(process.argv))
    .option("run", {
        alias: "r",
        type: "string",
        describe: "Run the ACPL file after compilation finishes"
    })
    .option("output", {
        alias: "o",
        type: "string",
        describe: "The file name of the compiled ACPL file"
    })
    .option("help", {
        alias: "h",
        describe: "Shows a list of options"
    })
    .option("version", {
        alias: "v",
        describe: "Shows the version of TSCPL"
    })
    .argv;

console.log(chalk.hex("#0077ff").bold("TSCPL v1.2.6"));

if (argv._[0] === undefined) {
    console.log("TSCPL is a compiler inspired by ACPL powered by libtscpl. It's goal is to provide a ACPL compiler written in TypeScript.");
    console.log("");
    console.log(`To learn more, see ${chalk.blue.bold("https://github.com/mdwalters/TSCPL#readme")}`);
    console.log(`To learn more about libtscpl, see ${chalk.blue.bold("https://github.com/mdwalters/TSCPL#libtscpl")}`);
    console.log(`To learn ACPL, see ${chalk.blue.bold("https://hackmd.io/@mdwalters/acpl")}`);
    console.log("");
    console.log(`Found a bug, or have a feature suggestion? Create a new issue at ${chalk.blue.bold("https://github.com/mdwalters/TSCPL/issues/new")}`);
    exit(1);
}

const output_file: string = (argv.output || argv.o ? argv.output || argv.o : `${argv._[0].split(".acpl")[0]}.ts`);

console.log(chalk.yellow(`Compiling ${chalk.yellowBright.bold(argv._[0])}...`));

try {
    compile(argv._[0], output_file);
} catch(e) {
    console.log(chalk.red(`${e} of ${chalk.red.bold(argv._[0])}`));
    console.error(chalk.red(`Unsuccessfully compiled ${chalk.red.bold(argv._[0])}.`));
    exit(1);
}

console.log(chalk.green(`Successfully compiled ${chalk.greenBright.bold(argv._[0])} as ${chalk.greenBright.bold(`${output_file}`)}.`));

if (argv.run || argv.r) {
    console.log(chalk.yellow(`Running ${chalk.yellowBright.bold(`${output_file}`)}...`));
    exec("tsc", (error, stdout, stderr) => {
        if (error) {
            console.error(error);
            exit(1);
        }

        console.log(stdout);
        console.error(stderr);
    });

    exec(`node ${argv._[0].split(".acpl")[0]}.js`, (error, stdout, stderr) => {
        if (error) {
            console.error(error);
            exit(1);
        }

        console.log(stdout);
        console.error(stderr);
    });
}

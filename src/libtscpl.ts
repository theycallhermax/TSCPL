import * as fs from "fs";

/**
* Compiles a ACPL file
*
* @param file The ACPL file to compile
*/
export function compile(file: string, file_name: string = "main.acpl.ts"): void {
    let file = file.split("\n");

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
}
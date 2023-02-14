import * as fs from "fs";

/**
* Compiles a ACPL file
*
* @param file The ACPL file to compile
* @param output_file_name The name of the output file
*/
export function compile(file: string, output_file_name: string): void {
    let file: string[] = fs.readFileSync(file, "utf-8").split("\n");
    fs.writeFileSync(output_file_name, "");

    for (let i in file) {
        if (file[i].split(" ")[0] === "outln") {
            fs.appendFile(output_file_name, `console.log(${file[i].split(" ").slice(1, file[i].split(" ").length).join(" ")});\n`, appendFileCallback);
            continue;
        } else if (file[i].split(" ")[0] === "str") {
            fs.appendFile(output_file_name, `let ${file[i].split(" ")[1]}: string = ${file[i].split(" ").slice(2, file[i].split(" ").length).join(" ")};\n`, appendFileCallback);
            continue;
        } else if (file[i].split(" ")[0] === "int") {
            fs.appendFile(output_file_name, `let ${file[i].split(" ")[1]}: number = ${file[i].split(" ").slice(2, file[i].split(" ").length).join(" ")};\n`, appendFileCallback);
            continue;
        } else if (file[i].split("")[0] === "#") {
            fs.appendFile(output_file_name, `//${file[i].split("").slice(1, file[i].split("").length).join("")}\n`, appendFileCallback);
            continue;
        } else if (file[i].split(" ")[0] === "outs") {
            fs.appendFile(output_file_name, `console.log(${file[i].split(" ")[1]});\n`, appendFileCallback);
            continue;
        } else if (file[i] === "") {
            fs.appendFile(output_file_name, "\n", appendFileCallback);
            continue;
        } else {
            throw new Error(`ERROR: Invalid syntax at line ${parseInt(i) + 1}`);
        }
    }
}
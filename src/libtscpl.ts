import * as fs from "fs";

function callback() {
    return;
}

/**
* Compiles a ACPL file
*
* @param file The ACPL file to compile
* @param output_file_name The name of the output file
*/
export function compile(file: string, output_file_name: string): void {
    let file_split = fs.readFileSync(file, "utf-8").split("\n");
    fs.writeFileSync(output_file_name, "");

    for (let i in file_split) {
        if (file_split[i].split(" ")[0] === "outln") {
            fs.appendFile(output_file_name, `console.log(${file_split[i].split(" ").slice(1, file_split[i].split(" ").length).join(" ")});\n`, callback);
            continue;
        } else if (file_split[i].split(" ")[0] === "str") {
            if (file_split[i].split(" ")[1].length === 0) {
                fs.appendFile(output_file_name, `let ${file_split[i].split(" ")[1]}: string;\n`, callback);
            } else {
                fs.appendFile(output_file_name, `let ${file_split[i].split(" ")[1]}: string = ${file_split[i].split(" ").slice(2, file_split[i].split(" ").length).join(" ")};\n`, callback);
            }
            continue;
        } else if (file_split[i].split(" ")[0] === "int") {
            if (file_split[i].split(" ")[1].length === 0) {
                fs.appendFile(output_file_name, `let ${file_split[i].split(" ")[1]}: number;\n`, callback);
            } else {
                fs.appendFile(output_file_name, `let ${file_split[i].split(" ")[1]}: number = ${file_split[i].split(" ").slice(2, file_split[i].split(" ").length).join(" ")};\n`, callback);
            }
            continue;
        } else if (file_split[i].split("")[0] === "#") {
            fs.appendFile(output_file_name, `//${file_split[i].split("").slice(1, file_split[i].split("").length).join("")}\n`, callback);
            continue;
        } else if (file_split[i].split(" ")[0] === "outs") {
            fs.appendFile(output_file_name, `console.log(${file_split[i].split(" ")[1]});\n`, callback);
            continue;
        } else if (file_split[i] === "") {
            fs.appendFile(output_file_name, "\n", callback);
            continue;
        } else {
            throw `Invalid syntax at line ${parseInt(i) + 1}`;
        }
    }
}
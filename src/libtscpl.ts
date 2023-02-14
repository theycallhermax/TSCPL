import * as fs from "fs";

function callback(): void {
    return;
}

/**
* Compiles a ACPL file
*
* @param file The ACPL file to compile
* @param output_file_name The name of the output file
*/
export function compile(file: string, output_file_name: string): void {
    let file_split: string[] = fs.readFileSync(file, "utf-8").split("\n");
    let variables: string[] = [];

    fs.writeFileSync(output_file_name, "");

    for (let i in file_split) {
        if (file_split[i].split(" ")[0] === "outln") {
            fs.appendFile(output_file_name, `console.log(${file_split[i].split(" ").slice(1, file_split[i].split(" ").length).join(" ")});\n`, callback);
            continue;
        } else if (file_split[i].split(" ")[0] === "str") {
            if (file_split[i].split(" ")[1].length === 0) {
                variables.push(file_split[i].split(" ")[1]);
                fs.appendFile(output_file_name, `let ${file_split[i].split(" ")[1]}: string;\n`, callback);
            } else {
                variables.push(file_split[i].split(" ")[1]);
                fs.appendFile(output_file_name, `let ${file_split[i].split(" ")[1]}: string = ${file_split[i].split(" ").slice(2, file_split[i].split(" ").length).join(" ")};\n`, callback);
            }
            continue;
        } else if (file_split[i].split(" ")[0] === "int" || file_split[i].split(" ")[0] === "dec") {
            if (file_split[i].split(" ")[1].length === 0) {
                variables.push(file_split[i].split(" ")[1]);
                fs.appendFile(output_file_name, `let ${file_split[i].split(" ")[1]}: number;\n`, callback);
            } else {
                variables.push(file_split[i].split(" ")[1]);
                fs.appendFile(output_file_name, `let ${file_split[i].split(" ")[1]}: number = ${file_split[i].split(" ").slice(2, file_split[i].split(" ").length).join(" ")};\n`, callback);
            }
            continue;
        } else if (file_split[i].split("")[0] === "#") {
            fs.appendFile(output_file_name, `//${file_split[i].split("").slice(1, file_split[i].split("").length).join("")}\n`, callback);
            continue;
        } else if (file_split[i].split(" ")[0] === "outs") {
            if (!(variables.includes(file_split[i].split(" ")[1]))) {
                throw `Tried to print a undefined variable at line ${parseInt(i) + 1}`;
            }

            fs.appendFile(output_file_name, `console.log(${file_split[i].split(" ")[1]});\n`, callback);
            continue;
        } else if (file_split[i] === "") {
            fs.appendFile(output_file_name, "\n", callback);
            continue;
        } else {
            throw `Invalid statement at line ${parseInt(i) + 1}`;
        }
    }
}
import { options } from "./interfaces";

declare function compile(file: string, output_file_name: string, options: options): void;

export = compile;

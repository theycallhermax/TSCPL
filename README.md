# TSCPL
TSCPL (**T**ype**S**cript **C**ompiled **P**rogramming **L**anguage) is a compiler inspired by ACPL. The original ACPL compiler compiles ACPL files to C, but TSCPL can compile ACPL files to TypeScript and even run ACPL files after compilation.
## Compiling and Running ACPL files
### Compiling
To compile a ACPL file, you just need to run the following command:
```bash
npx tscpl [ACPL file here]
```
### Running
Since version 1.1.0, TSCPL can run ACPL files automatically after the file is compiled. To do this, run the following command:
```bash
npx tscpl [ACPL file here] --run
```
## Output files
TSCPL compiles ACPL files to TypeScript in the file format of `[original ACPL file name].ts`. Since version 1.2.0, you can use the `--output` flag to output the compiled ACPL file to any file name you want! Please note that this doesn't change the output language. To do this, run the following command:
```bash
npx tscpl [ACPL file here] --output [compiled ACPL file name here]
```
# libtscpl
Since version 1.2.0, libtscpl is the backend for TSCPL written in TypeScript. It provides TSCPL with it's core functions, such as compiling ACPL files.
## Documentation
### `compile()`
Compiles a ACPL file.
## Example script
```
# main.acpl
outln "Hello from libtscpl!"
```

```ts
// index.ts
import { compile } from "tscpl/libtscpl";
import * as fs from "fs";

let acpl: string = fs.readFileSync("main.acpl", "utf-8");

try {
    compile(acpl, "main.acpl.ts");
} catch(e) {
    console.error(e);
}
```

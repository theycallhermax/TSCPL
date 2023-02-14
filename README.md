# TSCPL
TSCPL is a compiler inspired by ACPL. The original ACPL compiler compiles ACPL files to C, but TSCPL can compile ACPL files to TypeScript and even run ACPL files after compilation.
## Compiling and Running ACPL files
### Compiling
To compile a ACPL file, you just need to run the following command:
```bash
tscpl [ACPL script here]
```
### Running
Since version 1.1.0, TSCPL can run ACPL files automatically after the file is compiled. To do this, run the following command:
```bash
tscpl [ACPL script here] --run
```

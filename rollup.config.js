import { babel } from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import pkg from "./package.json";

const extensions = [".js", ".jsx", ".ts", ".tsx"];
const config = {
  input: "src/index.tsx",
  output: [
    {
      file: pkg.module,
      format: "esm",
      sourcemap: true,
    },
    {
      file: pkg.main,
      format: "cjs",
      sourcemap: true,
    },
  ],
  external: ["react"],
  plugins: [
    resolve({ extensions }),
    commonjs(),
    babel({
      extensions,
      babelHelpers: "bundled",
      include: ["src/**/*"],
    }),
    terser(),
  ],
};

export default config;

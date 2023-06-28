import type { Loader, TransformOptions } from "esbuild";

export interface Options {
  jsxFactory?: string;
  jsxFragment?: string;
  sourcemap?: boolean | "inline" | "external";
  loaders?: {
    [ext: string]: Loader;
  };
  target?: string;
  format?: string;
  tsconfigRaw?: TransformOptions["tsconfigRaw"];
}

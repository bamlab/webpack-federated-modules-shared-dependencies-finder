export type Dependencies = Record<string, string>;

export interface PackageJson {
  name: string;
  dependencies?: Dependencies;
  devDependencies?: Dependencies;
}


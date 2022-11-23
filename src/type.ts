export type Dependencies = Record<string, string>;

export interface PackageJson {
  name: string;
  dependencies?: Dependencies;
  devDependencies?: Dependencies;
}

// Magic from NestJS https://github.com/nestjs/nest/blob/93d1401907a40c57ec359458dd54c7784e240297/packages/common/interfaces/type.interface.ts
export interface Type<T = any> extends Function {
  new (...args: any[]): T;
}

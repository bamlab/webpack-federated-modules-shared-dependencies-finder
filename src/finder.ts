import { join } from 'path';
import { loadPackageContent } from './load-package';

import {
  DependenciesExtractor,
  ProductionNonWorkspaceDependenciesExtractor,
  ProductionWorkspaceDependenciesExtractor,
} from './dependencies-extractor';
import { mergeDependencies } from './merge-dependencies';
import { ProcessedPackages } from './processed-packages';
import { Dependencies, Type } from './type';

export class DependenciesFinder {
  private basePath: string;
  private processedPackages: ProcessedPackages;
  private dependenciesToKeep: DependenciesExtractor;
  private dependenciesToRecurse: DependenciesExtractor;

  constructor(
    basePath: string = '.',
    DependenciesToKeepStrategy: Type<DependenciesExtractor> = ProductionNonWorkspaceDependenciesExtractor,
    DependenciesToRecurseStrategy: Type<DependenciesExtractor> = ProductionWorkspaceDependenciesExtractor
  ) {
    this.processedPackages = new ProcessedPackages();
    this.basePath = basePath;
    this.dependenciesToKeep = new DependenciesToKeepStrategy();
    this.dependenciesToRecurse = new DependenciesToRecurseStrategy();
  }

  /**
   * Given the actual path and the content of the package json
   * @param path
   * @returns
   */
  private findDependenciesRecursively(path: string): Dependencies {
    const packageContent = loadPackageContent(path);
    this.processedPackages.markAsProcessed(packageContent.name);

    let dependencies = this.dependenciesToKeep.extract(packageContent);
    const dependenciesToRecurse = this.dependenciesToRecurse.extract(packageContent);

    for (let packageName of Object.keys(dependenciesToRecurse)) {
      const subPackagePath = join(path, 'node_modules', packageName);
      const packageContent = loadPackageContent(subPackagePath);

      if (this.processedPackages.isProcessed(packageContent.name)) {
        continue;
      }

      const subPackageDependencies = this.findDependenciesRecursively(subPackagePath);
      dependencies = mergeDependencies(dependencies, subPackageDependencies);
    }

    return dependencies;
  }

  getDependencies() {
    return this.findDependenciesRecursively(this.basePath);
  }
}

import { Dependencies, PackageJson } from './type';
import { filterByValue } from './utils';

export abstract class DependenciesExtractor {
  abstract extract(content: PackageJson): Dependencies;
}

class ProductionDependenciesExtractor extends DependenciesExtractor {
  extract(content: PackageJson): Dependencies {
    return content.dependencies || {};
  }
}

/**
 * Filter a list of dependencies to get the one that have value "workspace:*"
 *
 * @param dependencies - One layer deep object (Record) of package names and package versions
 * @returns - One layer deep object (Record) of package names and package versions
 */
export class ProductionNonWorkspaceDependenciesExtractor extends ProductionDependenciesExtractor {
  extract(content: PackageJson): Dependencies {
    const dependencies = super.extract(content);
    const condition = (value: string) => !value.startsWith('workspace:');
    return filterByValue(dependencies, condition);
  }
}

/**
 * Filter a list of dependencies to get the one that DON'T have value "workspace:*"
 *
 * @param dependencies - One layer deep object (Record) of package names and package versions
 * @returns - One layer deep object (Record) of package names and package versions
 */
export class ProductionWorkspaceDependenciesExtractor extends ProductionDependenciesExtractor {
  extract(content: PackageJson): Dependencies {
    const dependencies = super.extract(content);
    const condition = (value: string) => value.startsWith('workspace:');

    return filterByValue(dependencies, condition);
  }
}

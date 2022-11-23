import { readFileSync } from 'fs';
import { join } from 'path';
import { PackageJson } from './type';

/**
 * Given a folder path, returns the parsed json content of package.json
 *
 * @param {string} path - folder path
 * @returns {object} - parsed json content of package.json
 */
export function loadPackageContent(path: string): PackageJson {
  const packagePath = join(path, 'package.json');
  const packageRawContent = readFileSync(packagePath, 'utf-8') as string;
  const packageContent = JSON.parse(packageRawContent) as PackageJson;
  return packageContent;
}

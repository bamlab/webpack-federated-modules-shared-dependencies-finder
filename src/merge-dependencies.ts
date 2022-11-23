/**
 * Given two records of dependencies (left, right) merge into one.
 * Raise an error if two dependencies exists in different record and have a different version.
 *
 * @param left - first record of dependencies
 * @param right - second record of dependencies
 * @returns merged record
 */
export function mergeDependencies(left: Record<string, string>, right: Record<string, string>): Record<string, string> {
  let results = { ...left };
  for (let rightKey of Object.keys(right)) {
    if (left[rightKey] === undefined) {
      results[rightKey] = right[rightKey];
      continue;
    }
    if (results[rightKey] === right[rightKey]) {
      continue;
    }
    throw new Error(`Dependency ${rightKey} has two versions defined: ${left[rightKey]} and ${right[rightKey]}`);
  }
  return results;
}

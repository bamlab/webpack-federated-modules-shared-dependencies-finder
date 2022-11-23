import { Dependencies } from './type';

/**
 * Filter data so the returns objects only contains entries whose values matches conditions.
 *
 * @param data - One layer deep object (Record) whith key and value
 * @param condition - Condition to keep the entry
 * @returns
 */
export function filterByValue(data: Dependencies, condition: (value: string) => boolean): Dependencies {
  const dataEntries = Object.entries(data);
  const filteredEntries = dataEntries.filter(([_key, value]) => condition(value));
  return Object.fromEntries(filteredEntries);
}

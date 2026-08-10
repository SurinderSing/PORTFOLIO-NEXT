/**
 * Reorders an array by moving an item from startIndex to endIndex
 * and assigning updated 1-based sort_order indices.
 */
export function reorderArray<T extends { sort_order?: number }>(
  list: T[],
  startIndex: number,
  endIndex: number
): T[] {
  if (startIndex === endIndex) return list;
  const result = [...list];
  const [moved] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, moved);

  return result.map((item, index) => ({
    ...item,
    sort_order: index + 1,
  }));
}

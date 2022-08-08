export function generateSeatNumbers(capacity: number): number[] {
  const array: number[] = [];
  for (let i = 1; i <= capacity; i++) {
    array.push(i);
  }
  return array;
}

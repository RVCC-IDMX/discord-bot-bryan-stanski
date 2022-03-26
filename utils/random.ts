/**
 * @function getRandomInt
 * @param max
 * @param min
 * @returns number - random number between min and max (exclusively)
 */

export default function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min)) + max;
}

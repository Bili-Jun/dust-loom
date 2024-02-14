import { nanoid } from 'nanoid'
import { Point } from 'pixi.js';

export function copyPoint(point: Point) {
  const { x, y } = point;
  return new Point(x, y);
}

export function generateId() {
  return nanoid(8)
}

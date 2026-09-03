type Point = { x: number; y: number };

const findRoute = (curr: Point, target: Point): boolean | undefined => {
  if (curr.x === target.x && curr.y === target.y) {
    return true;
  }

};

export const main = (): number => {
  throw new Error("Solution not implemented");
};

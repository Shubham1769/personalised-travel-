// Define a function that takes an array of Point objects and a tolerance value
interface Point {
  x: number;
  y: number;
}

export function douglasPeucker(points: Point[], tolerance: number) {
  // Create a list to hold the simplified points
  const simplifiedPoints: Point[] = [];
  // Add the first point to the list
  simplifiedPoints.push(points[0]);
  // Call the recursive helper function
  douglasPeuckerRecursive(
    points,
    tolerance,
    0,
    points.length - 1,
    simplifiedPoints,
  );
  // Add the last point to the list
  simplifiedPoints.push(points[points.length - 1]);
  // Return the simplified points
  return simplifiedPoints;
}

// Define a recursive helper function
function douglasPeuckerRecursive(
  points: Point[],
  tolerance: number,
  start: number,
  end: number,
  simplifiedPoints: Point[],
) {
  // Find the point with the maximum distance from the line
  let maxDist = 0;
  let maxIndex = 0;
  for (let i = start + 1; i < end; i++) {
    // Calculate the distance from the point to the line
    const dist = distanceToLine(points[i], points[start], points[end]);
    // Update the maximum distance and index if necessary
    if (dist > maxDist) {
      maxDist = dist;
      maxIndex = i;
    }
  }
  // If the maximum distance is greater than the tolerance
  if (maxDist > tolerance) {
    // Recursively simplify the left and right sections
    douglasPeuckerRecursive(
      points,
      tolerance,
      start,
      maxIndex,
      simplifiedPoints,
    );
    simplifiedPoints.push(points[maxIndex]);
    douglasPeuckerRecursive(points, tolerance, maxIndex, end, simplifiedPoints);
  }
}

// Define a function that calculates the distance from a point to a line
function distanceToLine(point: Point, start: Point, end: Point) {
  // Calculate the length of the line
  const lineLength = Math.sqrt(
    Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2),
  );
  // Calculate the distance from the point to the line
  return (
    Math.abs(
      (point.x - start.x) * (end.y - start.y) -
        (point.y - start.y) * (end.x - start.x),
    ) / lineLength
  );
}

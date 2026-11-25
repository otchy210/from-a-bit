export function parseCapacityBits(value) {
  if (typeof value !== "string" || !/^[1-9][0-9]*$/.test(value)) {
    throw new Error("Capacity must be a positive decimal integer string.");
  }
  return BigInt(value);
}

const decimalUnits = ["KB", "MB", "GB", "TB", "PB", "EB", "ZB"];
const unitBoundaries = decimalUnits.map((unit, index) => ({
  unit,
  bits: 8n * 1_000n ** BigInt(index + 1),
}));

export function capacityBoundaries(bits, previousBits = bits) {
  return unitBoundaries.filter((boundary) => boundary.bits <= bits).map((boundary) => ({
    unit: boundary.unit,
    // Round the display coordinate after taking the ratio with BigInt.
    percent: Number((boundary.bits * 10_000_000_000n + bits / 2n) / bits) / 100_000_000,
    crossed: boundary.bits > previousBits,
  }));
}

export function visibleCapacityBands(boundaries, width) {
  if (width < 1) return null;
  const pixelPercent = 100 / width;
  // The bands grow by powers of 1,000, so any subpixel bands are at the
  // beginning, or in the final sliver just past a unit boundary.
  let start = 0;
  let end = boundaries.length;
  let position = 0;
  while (start < end && boundaries[start].percent - position < pixelPercent) {
    position = boundaries[start].percent;
    start++;
  }
  if (end > start && 100 - boundaries[end - 1].percent < pixelPercent) end--;
  return { start, end };
}

export function capacityFill(boundaries, { start, end }) {
  const startingUnit = boundaries[start - 1]?.unit ?? "B";
  let color = `var(--capacity-${startingUnit.toLowerCase()})`;
  if (start === end) return color;

  const stops = [`${color} 0%`];
  for (let index = start; index < end; index++) {
    const { unit, percent } = boundaries[index];
    const nextColor = `var(--capacity-${unit.toLowerCase()})`;
    stops.push(`${color} ${percent}%`, `${nextColor} ${percent}%`);
    color = nextColor;
  }
  stops.push(`${color} 100%`);
  return `linear-gradient(to right, ${stops.join(", ")})`;
}

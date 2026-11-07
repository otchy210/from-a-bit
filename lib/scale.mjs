// Keep the exact capacity as BigInt; only its logarithm is needed for rendering.
export function capacityLog2(value) {
  if (typeof value !== "bigint" || value <= 0n) throw new Error("Capacity must be a positive BigInt.");
  const binary = value.toString(2);
  const significant = binary.slice(0, 53);
  return Math.log2(Number.parseInt(significant, 2)) + binary.length - significant.length;
}

export function cameraLog2(capacities, progress) {
  const position = Math.max(0, Math.min(capacities.length - 1, progress));
  const index = Math.floor(position);
  const next = Math.min(index + 1, capacities.length - 1);
  return capacities[index] + (capacities[next] - capacities[index]) * (position - index);
}

export function areaScale(capacity, camera) {
  return 2 ** ((capacity - camera) / 2);
}

export function parseCapacityBits(value) {
  if (typeof value !== "string" || !/^[1-9][0-9]*$/.test(value)) {
    throw new Error("Capacity must be a positive decimal integer string.");
  }
  return BigInt(value);
}

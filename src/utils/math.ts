export const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max)

export const lerp = (a: number, b: number, t: number): number => a + (b - a) * t

export const damp = (
  current: number,
  target: number,
  smoothing: number,
  delta: number,
): number => lerp(current, target, 1 - Math.exp(-smoothing * delta))

export const mapRange = (
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
): number => outMin + ((value - inMin) * (outMax - outMin)) / (inMax - inMin)

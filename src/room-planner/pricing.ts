import type { LockerTemplate, LockerConfig } from './types';

/** Compute total price for one locker instance given its template and config. */
export function priceLocker(template: LockerTemplate, config: LockerConfig): number {
  const widthKey = String(config.widthIn);
  const base = template.pricing.basePriceByWidthIn[widthKey] ?? 0;

  const depthKey = String(config.depthIn);
  const depthExtra = template.pricing.depthSurcharge[depthKey] ?? 0;

  const accessoryTotal = config.accessoryIds.reduce((sum, accId) => {
    const acc = template.accessories.find((a) => a.id === accId);
    return sum + (acc?.price ?? 0);
  }, 0);

  return base + depthExtra + accessoryTotal;
}

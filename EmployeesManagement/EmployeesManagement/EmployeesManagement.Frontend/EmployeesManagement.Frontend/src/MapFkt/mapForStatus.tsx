// src/utils.ts
export enum Status {
  Früh = 0,
  Spät = 1,
  Nacht = 2,
}

export const statusMap: Record<number, string> = {
  [Status.Früh]: 'früh',
  [Status.Spät]: 'spät',
  [Status.Nacht]: 'nacht',
};

export enum Workstatus {
  HomeOffice = 0,
  WorkAtHome = 1,
  Hybrid = 2,
}

export const absenceStatusMap: Record<number, string> = {
  [Workstatus.HomeOffice]: 'HomeOffice',
  [Workstatus.WorkAtHome]: 'WorkAtHome',
  [Workstatus.Hybrid]: 'Hybrid',

};

export function mapEnumValue<T>(enumMap: Record<number, string>, value: T): string {
  return enumMap[value as unknown as number] || 'Unknown';
}

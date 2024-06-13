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

export enum AbsenceStatus {
  Vacation = 0,
  InService = 1,
}

export const absenceStatusMap: Record<number, string> = {
  [AbsenceStatus.Vacation]: 'vacation',
  [AbsenceStatus.InService]: 'inService',
};

export function mapEnumValue<T>(enumMap: Record<number, string>, value: T): string {
  return enumMap[value as unknown as number] || 'Unknown';
}

export enum OrderStatus {
  Pending = 0,
  Approved = 1,
}

export const parseOrderStatus = (
  value?: string | string[] | null
): OrderStatus | undefined => {
  if (!value) return undefined;
  const normalized = String(value).trim().toUpperCase();

  switch (normalized) {
    case "PENDING":
      return OrderStatus.Pending;
    case "APPROVED":
      return OrderStatus.Approved;
    default:
      return undefined;
  }
};

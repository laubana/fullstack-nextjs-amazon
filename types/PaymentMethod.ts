export type PaymentMethod = {
  card: { brand: string; exp_month: number; exp_year: number; last4: string };
  id: string;
};

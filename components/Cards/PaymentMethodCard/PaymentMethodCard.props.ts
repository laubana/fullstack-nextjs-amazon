export interface PaymentMethodCardProps {
  brand: string;
  expiryMonth: number;
  expiryYear: number;
  last4: string;
  onClick: () => void;
  paymentMethodId: string;
  selected?: boolean;
}

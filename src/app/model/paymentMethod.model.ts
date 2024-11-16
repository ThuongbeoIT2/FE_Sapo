export interface PaymentMethod {
  id: number;
  description: string;
  method: string;
  slug: string;
}

export const paymentMethods: PaymentMethod[] = [
  { id: 1, description: "VN Pay. Ví điện tử", method: "VN-PAY", slug: "VN-PAY" },
  { id: 2, description: "VI VIET. Ví điện tử", method: "Vi-VIET", slug: "Vi-VIET" },
  { id: 3, description: "CREDIT-CARD. Thẻ thanh toán", method: "CREDIT-CARD", slug: "CREDIT-CARD" },
  { id: 4, description: "MONEY. Thanh toán tại chỗ", method: "MONEY", slug: "MONEY" }
];

export class OrderDetailResponse {
  id: number;
  quantity: number;
  price_total: number;
  productName: string;
  storeName: string;
  priceO: number | null;
  discount: number;
  initStatus: string;
  isPayment: string;

  constructor(
      id: number,
      quantity: number,
      price_total: number,
      productName: string,
      storeName: string,
      priceO: number | null,
      discount: number,
      initStatus: string,
      isPayment: string
  ) {
      this.id = id;
      this.quantity = quantity;
      this.price_total = price_total;
      this.productName = productName;
      this.storeName = storeName;
      this.priceO = priceO;
      this.discount = discount;
      this.initStatus = initStatus;
      this.isPayment = isPayment;
  }
}

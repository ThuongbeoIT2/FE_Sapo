export class AdminStatistical {
  store: number;
  user: number;
  product: number;
  productOfStore: number;
  orderDetail: number;
  revenue: number;

  constructor(
    store: number,
    user: number,
    product: number,
    productOfStore: number,
    orderDetail: number,
    revenue: number
  ) {
    this.store = store;
    this.user = user;
    this.product = product;
    this.productOfStore = productOfStore;
    this.orderDetail = orderDetail;
    this.revenue = revenue;
  }
}

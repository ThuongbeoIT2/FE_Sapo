export class StoreStatistical {
  productOS: number;
  orderDetail: number;
  revenue: number;
  comment: number;

  constructor(productOS: number, orderDetail: number, revenue: number, comment: number) {
    this.productOS = productOS;
    this.orderDetail = orderDetail;
    this.revenue = revenue;
    this.comment = comment;
  }
}
